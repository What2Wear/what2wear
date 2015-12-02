package com.example.zongyiwang.what2weartest;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class what2wear_weather extends AppCompatActivity {

    TextView location;
    TextView lastUpdate;
    TextView details;
    TextView temperature;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_what2wear_weather);

    }
}
