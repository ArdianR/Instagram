package com.instagram.streamingkotlin

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Created by Valdio Veliu on 18/01/2018.
 */


class StreamingKotlinModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "StreamingKotlin"
    }

    @ReactMethod
    fun playVideoStream(videoTitle: String, videoUrl: String) {
        val intent = Intent(reactApplicationContext, StreamingKotlinActivity::class.java)
        intent.putExtra("videoTitle", videoTitle)
        intent.putExtra("videoUrl", videoUrl)
        reactApplicationContext.startActivity(intent)
    }

}