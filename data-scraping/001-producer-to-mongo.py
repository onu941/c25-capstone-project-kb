import re
import requests
from bs4 import BeautifulSoup
import json
from kafka import KafkaProducer
import os 
from dotenv import load_dotenv

load_dotenv()

producer = KafkaProducer(bootstrap_servers=[os.getenv("KAFKA_URI") or'localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'))

for i in range(1, 21):
    url = f"https://reubird.hk/search/type/party-room?page={i}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    links = soup.find_all("a", class_="no-hover-link")
    for link in links:
        link_url = "https://reubird.hk" + link["href"]
        link_response = requests.get(link_url)
        link_soup = BeautifulSoup(link_response.content, "html.parser")
        # 場地低消1.一至四時數 2.其餘時數 3.一至四價錢 4.平日價錢
        low_entry = link_soup.find_all("td")
        lowest_total_hour_weekday = 0
        lowest_total_hour_holiday = 0
        fewest_headcount_weekday = 0
        fewest_headcount_holiday = 0
        for index, low_entry in enumerate(low_entry):
            low_entry_match = re.search(r'\d+', low_entry.text)
            if index == 4:
                if low_entry_match is not None:
                    lowest_total_hour_weekday = int(low_entry_match.group(0))
            elif index == 5:
                if low_entry_match is not None:
                    lowest_total_hour_holiday = int(low_entry_match.group(0))
            elif index == 7:
                if low_entry_match is not None:
                    fewest_headcount_weekday = int(low_entry_match.group(0))
            elif index == 8:
                if low_entry_match is not None:
                    fewest_headcount_holiday = int(low_entry_match.group(0))
        # 房種1.地區 2.最少人數 3.最多人數        
        room_string = link_soup.find_all("h2")
        if room_string is not None:
            roomType = room_string[1].text.split(" · ")
            district = roomType[1]
            if len(roomType) >= 3:
                try:
                    min_person = int(roomType[2].split()[1])
                except:
                    min_person = 0
                try:
                    max_person = int(roomType[2].split()[3])
                except:
                    max_person = 0
        # 連結
        # print(link_url)
        # 面積
        room_size_arr = link_soup.find_all("p")
        room_size_string = room_size_arr[1].text
        room_size_string_arr = room_size_string.split()
        if len(room_size_string_arr) > 1:
            try:
                room_size = int(room_size_string_arr[1])
            except:
                room_size = 0
        # 設備
        "飲品免費任飲"
        "Netflix"
        "Disney+"
        "麻雀"
        "唱K"
        "沒有遊戲及唱K設備"
        "露台"
        "天台"
        "獨立廚房"
        "沒有提供PS4"
        "沒有提供Switch"
        "沒有提供VR設備"
        "沒有提供Board Games"
        "沒有提供 BBQ"
        "沒有提供打邊爐服務"
        equipments = link_soup.find_all("div", class_="venue-listing-font")
        free_drink = False
        netflix = False
        disney_plus = False
        mahjong = False
        karaoke = False
        balcony = False
        rooftop = False
        kitchen = False
        ps4 = True
        switch = True
        vr_gaming = True
        board_game = True
        barbecue = True
        hot_pot = True

        for equipment in equipments:
            if "free_drink" in equipment.text:
                free_drink = True
            if "Netflix" in equipment.text:
                netflix = True
            if "Disney+" in equipment.text:
                disney_plus = True
            if "麻雀" in equipment.text:
                mahjong = True
            if "唱K" in equipment.text:
                karaoke = True
            if "露台" in equipment.text:
                balcony = True
            if "天台" in equipment.text:
                rooftop = True
            if "獨立廚房" in equipment.text:
                kitchen = True
            if "沒有提供PS4" in equipment.text:
                ps4 = False
            if "沒有提供Switch" in equipment.text:
                switch = False
            if "沒有提供VR設備" in equipment.text:
                vr_gaming = False
            if "沒有提供Board Games" in equipment.text:
                board_game = False
            if "沒有提供 BBQ" in equipment.text:
                barbecue = False
            if "沒有提供打邊爐服務" in equipment.text:
                hot_pot = False
                break
                
        data = {
        'link_url': link_url,
        'district': district,
        'min_person': min_person,
        'max_person': max_person,
        'lowest_total_hour_weekday': lowest_total_hour_weekday,
        'lowest_total_hour_holiday': lowest_total_hour_holiday,
        'fewest_headcount_weekday': fewest_headcount_weekday,
        'fewest_headcount_holiday': fewest_headcount_holiday,
        'room_size': room_size,
        'free_drink':free_drink,
        'netflix':netflix,
        'disney_plus':disney_plus,
        'mahjong':mahjong,
        'karaoke':karaoke,
        'balcony':balcony,
        'rooftop':rooftop,
        'kitchen':kitchen,
        'ps4':ps4,
        'switch':switch,
        'vr_gaming':vr_gaming,
        'board_game':board_game,
        'barbecue':barbecue,
        'hot_pot':hot_pot,
        }
        producer.send(topic='partyroom_from_reubird', value=data)
        print(data)
