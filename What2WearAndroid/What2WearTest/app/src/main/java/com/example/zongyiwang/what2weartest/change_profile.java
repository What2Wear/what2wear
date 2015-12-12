package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

/**
 * Created by zongyiwang on 12/12/15.
 */
public class change_profile extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_change_profile);
    }

    public void changeToProfile(View view)
    {
        Intent toProfile = getIntent();
        toProfile = new Intent(this,ProfileinfoActivity.class);
        startActivity(toProfile);
    }
}


