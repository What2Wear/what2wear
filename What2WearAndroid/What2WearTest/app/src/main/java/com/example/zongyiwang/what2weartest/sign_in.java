package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

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
        boolean errorFlag = false;
        EditText username = (EditText)findViewById(R.id.LI_username);
        EditText password = (EditText)findViewById(R.id.LI_password);

        if(TextUtils.isEmpty(username.getText().toString()) || TextUtils.isEmpty(password.getText().toString()))
        {
            errorFlag = true;
            Toast.makeText(getApplicationContext(),"Invalid Username or Password!",Toast.LENGTH_SHORT).show();
        }

        if(!errorFlag)
        {
            //TODO: CHECK USERNAME AND PASSWORD AGAINST THE SERVER'S ACCEPTED VALUES AND IF EQUAL THEN PROCEED

            Intent profilePage = getIntent();
            profilePage = new Intent(this,ProfileinfoActivity.class);
            startActivity(profilePage);
        }
    }
}
