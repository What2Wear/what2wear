package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

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

    public void toProfilePage(View view)
    {
        Intent profilePage = getIntent();
        profilePage = new Intent(this,ProfileinfoActivity.class);
        startActivity(profilePage);
    }
}
