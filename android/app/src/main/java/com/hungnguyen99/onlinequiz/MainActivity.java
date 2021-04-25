package com.hungnguyen99.onlinequiz;

import com.reactnativenavigation.NavigationActivity;
import android.os.Bundle;
import androidx.annotation.Nullable;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
