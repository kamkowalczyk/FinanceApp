FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Finance.Domain/*.csproj ./Finance.Domain/
COPY Finance.Application/*.csproj ./Finance.Application/
COPY Finance.Infrastructure/*.csproj ./Finance.Infrastructure/
COPY Finance.API/*.csproj ./Finance.API/

RUN dotnet restore Finance.API/Finance.API.csproj

COPY . .

RUN dotnet publish Finance.API/Finance.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Finance.API.dll"]