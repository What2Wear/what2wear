package com.example.zongyiwang.what2weartest;

import android.view.View;
import android.content.Intent;

/**
 * Created by Ben25 on 12/7/2015.
 */
public class sign_up
{
    public void toMain(View view)
    {
        Intent backToMain = getIntent();
        backToMain = new Intent(this,What2Wear.class);
        startActivity(What2Wear);
    }
}
