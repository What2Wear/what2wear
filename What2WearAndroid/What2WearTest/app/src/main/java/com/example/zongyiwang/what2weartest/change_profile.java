package com.example.zongyiwang.what2weartest;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Toast;

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
        boolean errorFlag = false;
        EditText newUsername = (EditText)findViewById(R.id.changeUsername);
        EditText newEmail = (EditText)findViewById(R.id.changeEmail);
        EditText newPassword = (EditText)findViewById(R.id.changePass);
        EditText confirmPassword = (EditText)findViewById(R.id.confirmPass);
        EditText newZipcode = (EditText)findViewById(R.id.changeZipcode);
        EditText newColdTemp = (EditText)findViewById(R.id.changeColdTemp);
        EditText newChillyTemp = (EditText)findViewById(R.id.changeChillyTemp);
        EditText newComfortTemp = (EditText)findViewById(R.id.changeComfortableTemp);
        EditText newWarmTemp = (EditText)findViewById(R.id.changeWarmTemp);
        RadioGroup newGender = (RadioGroup)findViewById(R.id.changeGender);

        if(!(TextUtils.equals(newPassword.getText().toString(),confirmPassword.getText().toString())))
        {
            errorFlag = true;
            newPassword.setError("Passwords Don't Match!");
            confirmPassword.setError("Passwords Don't Match!");
        }

        if(newPassword.length() < 5)
        {
            errorFlag = true;
            newPassword.setError("Password length must be greater than 4 characters");
        }

        //Gender will have to handled separately
        //Highly inefficient way of handling which data needs to be sent out
        //if field is empty then ignore it otherwise get data and push to the server
        //data will be contained in string array
        //first go through and add data to the array
        //9 total possible fields to get data from
        EditText[] data = {newUsername,newEmail,newPassword,newZipcode,newColdTemp,newChillyTemp,newComfortTemp,newWarmTemp};
        EditText[] changeData = new EditText[1];
        int index = 0;

        for(int i = 0; i < data.length; i++)
        {
            if(TextUtils.isEmpty(data[i].getText()))
            {
                continue;
            }
            if(index >= changeData.length)
            {
                int length = changeData.length;
                EditText tmp[] = new EditText[length];
                for(int j = 0; j < tmp.length; j++)
                {
                    tmp[j] = changeData[j];
                }
                changeData = new EditText[length+1];
                for(int k = 0; k < length; k++)
                {
                    changeData[k] = tmp[k];
                }
            }
            changeData[index] = data[i];
            index++;
        }

        //DEBUG PRINT
        /*for(int i = 0; i < changeData.length; i++)
        {
            Log.v("INFO", changeData[i].toString());
        }*/

        if(!errorFlag)
        {
            Toast.makeText(getApplicationContext(),"Information Successfully Changed!",Toast.LENGTH_SHORT).show();
            Intent toProfile = getIntent();
            toProfile = new Intent(this,ProfileinfoActivity.class);
            startActivity(toProfile);
        }

    }
}


