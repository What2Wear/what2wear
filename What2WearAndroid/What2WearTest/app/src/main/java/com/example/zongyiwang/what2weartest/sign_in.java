package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Ben25 on 12/8/2015.
 */
public class sign_in extends AppCompatActivity
{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    }


    //button function
   public void toProfilePage(View view)
    {
        boolean errorFlag = false;
        EditText username = (EditText)findViewById(R.id.LI_username);
        EditText password = (EditText)findViewById(R.id.LI_password);

        Log.v("INFO", "MADE IT BEFORE DATA PACKAGING");

        //package data as a JSON object
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("email", username.getText().toString());
            jsonObject.put("password", password.getText().toString());
        } catch (JSONException e) {
            Log.v("ERROR","PACKAGE ERROR");
            e.printStackTrace();
        }
        Log.v("INFO", "MADE IT AFTER DATA PACKAGING");

        //make network calls
        //Login netCall = new Login();
        //netCall.execute(jsonObject.toString());


        //tests make sure data is valid
        if(TextUtils.isEmpty(username.getText().toString()) || TextUtils.isEmpty(password.getText().toString()))
        {
            errorFlag = true;
            Toast.makeText(getApplicationContext(), "Invalid Username or Password!", Toast.LENGTH_SHORT).show();
        }


        if(!errorFlag)
        {
            Intent profilePage = getIntent();
            profilePage = new Intent(this,ProfileinfoActivity.class);
            startActivity(profilePage);

        }
}

//////////////////////////////
/////////////////////////////

public class Login extends AsyncTask<String, Void, Void> {

    @Override
    protected Void doInBackground(String... params) {
        final String SERVER_URL = "https://wear.ymostofi.xyz";
        //data packaged now url connection
        Uri builtUri = Uri.parse(SERVER_URL).buildUpon().build();
        HttpURLConnection connection = null;
        StringBuilder sb = new StringBuilder();
        try {
            URL url = new URL(builtUri.toString());
            connection = (HttpURLConnection) url.openConnection();
            Log.v("INFO","AFTER OPENING CONNECTION");
            // connection.setRequestMethod("exports.postLogin");
            connection.setDoInput(true);
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            Log.v("INFO", "AFTER SETREQUEST METHOD");

            connection.setRequestProperty("Content-Type", "application/json");
            //connection.connect();
            //OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream());
            //ERRORS HERE
            OutputStream out = connection.getOutputStream();
            Log.v("INFO", params[0].toString());
            //out.write(params[0].toString());
            //out.write(params[0].getBytes());
            out.flush();
            //out.close();

            Log.v("INFO", "AFTER WRITE");
            int HttpResult = connection.getResponseCode();
            if (connection.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
                throw new RuntimeException("Failed : HTTP error code : " + connection.getResponseCode());
            }

            Log.v("INFO","HTTPRESULT = " + HttpResult);
            if (HttpResult == HttpURLConnection.HTTP_ACCEPTED) {
                Log.v("INFO","MADE IT INTO HTTP GOOD");
                BufferedReader br = new BufferedReader(new InputStreamReader(
                        connection.getInputStream(), "utf-8"));
                String line = null;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                br.close();

                System.out.println("" + sb.toString());

            } else {
                System.out.println(connection.getResponseMessage());
            }

        } catch (IOException e) {
            Log.e("ERROR", "INVALID URL");
            cancel(true);

        } finally {
            if (connection != null)
            {
                //debug
                Log.v("INFO", isCancelled()+"");
                connection.disconnect();
            }
        }
        return null;
    }

    /*@Override
    protected void onPostExecute(String result) {
        // something with data retrieved from server in doInBackground
    }*/
}
}

