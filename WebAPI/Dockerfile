FROM mcr.microsoft.com/dotnet/sdk:5.0

WORKDIR /home/app

COPY . .

RUN dotnet restore

RUN dotnet publish ./WebAPI/WebAPI.csproj -o /publish/

WORKDIR /publish

ENV ASPNETCORE_URLS="http://0.0.0.0:5000"

ENTRYPOINT ["dotnet", "WebAPI.dll"]