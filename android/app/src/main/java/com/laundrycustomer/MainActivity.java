package com.laundrycustomer;

import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.CallbackManager;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager;

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "LaundryCustomer";
    }
}
