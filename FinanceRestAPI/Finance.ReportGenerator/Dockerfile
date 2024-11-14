FROM mcr.microsoft.com/dotnet/runtime:8.0

RUN apt-get update && apt-get install -y cron

WORKDIR /app

COPY bin/Release/net8.0/ ./

COPY crontab.txt /etc/cron.d/report-cron

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

RUN chmod 0644 /etc/cron.d/report-cron

RUN crontab /etc/cron.d/report-cron

RUN touch /var/log/cron.log

CMD ["cron", "-f"]