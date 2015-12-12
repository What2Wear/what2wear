package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;


public class ProfileinfoActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profileinfo);
    }

    public void GetWhat2Wear(View view) {
        Intent what2wear = getIntent();
        what2wear = new Intent(this,what2wear_weather.class);
        startActivity(what2wear);
    }

    public void toChangeProfile(View view)
    {
        Intent changeProfile = getIntent();
        changeProfile = new Intent(this,change_profile.class);
        startActivity(changeProfile);
    }
}