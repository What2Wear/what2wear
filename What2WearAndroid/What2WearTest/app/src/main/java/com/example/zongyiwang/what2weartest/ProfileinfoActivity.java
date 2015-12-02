package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;


public class ProfileinfoActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profileinfo);

        final Button button = (Button) findViewById(R.id.button_what2wear);
    }

    public void GetWhat2Wear(View view) {
        //System.out.println("WHAT2WEAR!!");
        //button will redirect to the weather+clothing to wear
        Intent what2wear = getIntent();
        what2wear = new Intent(this,what2wear_weather.class);
        startActivity(what2wear);
    }
}