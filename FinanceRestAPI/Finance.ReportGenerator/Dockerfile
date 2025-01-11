FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

COPY Finance.Domain/Finance.Domain.csproj Finance.Domain/
COPY Finance.Infrastructure/Finance.Infrastructure.csproj Finance.Infrastructure/
COPY Finance.ReportGenerator/Finance.ReportGenerator.csproj Finance.ReportGenerator/

RUN dotnet restore Finance.ReportGenerator/Finance.ReportGenerator.csproj

COPY Finance.Domain/ Finance.Domain/
COPY Finance.Infrastructure/ Finance.Infrastructure/
COPY Finance.ReportGenerator/ Finance.ReportGenerator/

RUN dotnet publish Finance.ReportGenerator/Finance.ReportGenerator.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/runtime:8.0

RUN apt-get update && apt-get install -y cron

WORKDIR /app

COPY --from=build /app ./

COPY Finance.ReportGenerator/appsettings.ReportGenerator.json ./appsettings.ReportGenerator.json
COPY Finance.ReportGenerator/appsettings.ReportGenerator.Development.json ./appsettings.ReportGenerator.Development.json

COPY Finance.ReportGenerator/crontab.txt /etc/cron.d/report-cron
COPY Finance.ReportGenerator/run.sh /app/run.sh

RUN chmod +x /app/run.sh
RUN chmod 0644 /etc/cron.d/report-cron
RUN crontab /etc/cron.d/report-cron
RUN touch /var/log/cron.log

CMD ["cron", "-f"]
