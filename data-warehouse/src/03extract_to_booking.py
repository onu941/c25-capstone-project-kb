
    schedule.every(1).day.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)