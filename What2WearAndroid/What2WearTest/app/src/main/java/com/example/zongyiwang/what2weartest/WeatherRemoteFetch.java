package com.example.zongyiwang.what2weartest;

/**
 * Created by Ben2356
 */

import android.content.Context;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.HttpURLConnection;
import org.json.JSONObject;
import android.content.Context;
import android.util.Log;

public class WeatherRemoteFetch
{
    //assume the location will always be in the US --> TODO: extend the possibility of the user being in another country
    private static final String OPEN_WEATHER_API =  "http://api.openweathermap.org/data/2.5/weather?zip={zip code},us";


    public static JSONObject getJSON(Context context, int zip)
    {
        try
        {
            String zipCode = zip + "";
            String CUSTOM_OPEN_WEATHER_API = OPEN_WEATHER_API.replace("{zip code}",zipCode).concat("&appid=").concat(context.getString(R.string.OpenWeatherAPIKEY));
            URL url = new URL(CUSTOM_OPEN_WEATHER_API);
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            StringBuffer json = new StringBuffer(1024);
            String tmp = "";
            while((tmp=reader.readLine())!=null)
            {
                json.append(tmp).append('\n');
            }
            reader.close();
            JSONObject data = new JSONObject(json.toString());

            //if the fetching of data fails then code other than 200 will be displayed
            if(data.getInt("cod") != 200)
            {
                return null;
            }
            return data;
        }
        catch (Exception e)
        {
            return null;
        }
    }
}
