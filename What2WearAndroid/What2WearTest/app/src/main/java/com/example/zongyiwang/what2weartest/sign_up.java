package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Toast;

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
        boolean errorFlag = false;
        EditText username = (EditText)findViewById(R.id.username);
        EditText email = (EditText)findViewById(R.id.email);
        EditText password = (EditText)findViewById(R.id.password);
        EditText zipcode = (EditText)findViewById(R.id.zipcode);
        EditText coldTemp = (EditText)findViewById(R.id.coldTemp);
        EditText chillyTemp = (EditText)findViewById(R.id.chillyTemp);
        EditText comfortableTemp = (EditText)findViewById(R.id.comfortableTemp);
        EditText warmTemp = (EditText)findViewById(R.id.warmTemp);
        RadioGroup gender = (RadioGroup)findViewById(R.id.gender);

        if(TextUtils.isEmpty(username.getText().toString()) || TextUtils.indexOf(username.getText().toString(),' ') != -1 || username.getText().toString().length() < 5)
        {
            username.setError("Invalid Username, username must contain more than 4 characters and include no spaces");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(email.getText().toString()) || TextUtils.indexOf(email.getText().toString(),'@') == -1)
        {
            email.setError("Invalid Email Address");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(password.getText().toString()) || TextUtils.indexOf(password.getText().toString(),' ') != -1 || password.getText().toString().length() < 5)
        {
            password.setError("Invalid Password, password must contain more than 4 characters and include no spaces");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(zipcode.getText().toString()) || zipcode.getText().toString().length() > 5)
        {
            zipcode.setError("Invalid Zipcode");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(coldTemp.getText().toString()) || coldTemp.getText().toString().length() > 3)
        {
            coldTemp.setError("Invalid Temperature");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(chillyTemp.getText().toString()) || chillyTemp.getText().toString().length() > 3 )
        {
            chillyTemp.setError("Invalid Temperature");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(comfortableTemp.getText().toString()) || comfortableTemp.getText().toString().length() > 3)
        {
            comfortableTemp.setError("Invalid Temperature");
            errorFlag = true;
        }
        if(TextUtils.isEmpty(warmTemp.getText().toString()) || warmTemp.getText().toString().length() > 3)
        {
            warmTemp.setError("Invalid Temperature");
            errorFlag = true;
        }
        if(gender.getCheckedRadioButtonId() == -1)
        {
            Toast.makeText(getApplicationContext(),"Invalid Gender!",Toast.LENGTH_SHORT).show();
        }

        //sign up succeeded open up login in page
        if(!errorFlag)
        {
            //TODO: GATHER DATA FROM FIELDS AND IMPLEMENT DATA PUSH TO SERVER


            Intent toLogin = getIntent();
            toLogin = new Intent(this,sign_in.class);
            startActivity(toLogin);
        }
    }
}
