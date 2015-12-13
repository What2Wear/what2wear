package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioGroup;

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
        EditText newUsername = (EditText)findViewById(R.id.changeUsername);
        EditText newEmail = (EditText)findViewById(R.id.changeEmail);
        EditText newPassword = (EditText)findViewById(R.id.changePass);
        EditText newZipcode = (EditText)findViewById(R.id.changeZipcode);
        EditText newColdTemp = (EditText)findViewById(R.id.changeColdTemp);
        EditText newChillyTemp = (EditText)findViewById(R.id.changeChillyTemp);
        EditText newComfortTemp = (EditText)findViewById(R.id.changeComfortableTemp);
        EditText newWarmTemp = (EditText)findViewById(R.id.changeWarmTemp);
        RadioGroup newGender = (RadioGroup)findViewById(R.id.changeGender);

        //Gender will have to handled separately
        EditText[] data = {newUsername,newEmail,newPassword,newZipcode,newColdTemp,newChillyTemp,newComfortTemp,newWarmTemp};
        EditText[] changeData;
        int index = 0;

        for(int i = 0; i < data.length; i++)
        {
            if(TextUtils.isEmpty(data[i].getText()))
            {

            }
        }


        //if field is empty then ignore it otherwise get data and push to the server
        //data will be contained in string array
        //first go through and add data to the array

        //9 total possible fields to get data from


        Intent toProfile = getIntent();
        toProfile = new Intent(this,ProfileinfoActivity.class);
        startActivity(toProfile);
    }
}


