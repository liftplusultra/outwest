# Define a short date format
SHORT_DATE = "%m/%d/%Y"
SHORT_TIME = "%I:%M %P"
Date::DATE_FORMATS[:short_date] = SHORT_DATE
Time::DATE_FORMATS[:short_date] = SHORT_DATE
Time::DATE_FORMATS[:short_time] = SHORT_TIME
Time::DATE_FORMATS[:short_datetime] = "#{SHORT_DATE} #{SHORT_TIME}"

Time::DATE_FORMATS[:datepicker] = "%Y/%m/%d"
