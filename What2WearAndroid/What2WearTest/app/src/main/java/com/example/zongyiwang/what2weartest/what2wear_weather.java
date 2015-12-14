package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;

public class what2wear_weather extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_what2wear_weather);
    }

    public void toMain(View view)
    {
        Toast.makeText(getApplicationContext(),"You have successfully signed out!", Toast.LENGTH_SHORT).show();
        Intent home = getIntent();
        home = new Intent(this, What2Wear.class);
        startActivity(home);

    }
}
