package com.example.zongyiwang.what2weartest;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.content.Intent;

/**
 * Created by Ben25 on 12/7/2015.
 */
public class sign_up extends AppCompatActivity
{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    }
    public void toMain(View view)
    {
        Intent toLogin = getIntent();
        toLogin = new Intent(this,sign_in.class);
        startActivity(toLogin);
    }
}
