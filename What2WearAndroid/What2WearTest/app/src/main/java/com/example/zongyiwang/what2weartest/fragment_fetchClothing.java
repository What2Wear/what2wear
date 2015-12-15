package com.example.zongyiwang.what2weartest;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


public class fragment_fetchClothing extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        //causing null pointer exceptions --> need to fix
        /*ImageView imageView = (ImageView) getView().findViewById(R.id.tempImage);
        TextView temp = (TextView)getView().findViewById(R.id.fragment_temp);
        TextView what2wear = (TextView)getView().findViewById(R.id.fragmet_w2w);*/


        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_fragment_fetch_clothing, container, false);

    }
}
