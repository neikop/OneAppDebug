package com.example.windzlord.z_lab2_music.adapters.views_holder;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.windzlord.z_lab2_music.R;
import com.example.windzlord.z_lab2_music.models.MediaType;

import java.io.IOException;
import java.io.InputStream;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * Created by WindzLord on 12/1/2016.
 */

public class FavourViewHolder extends RecyclerView.ViewHolder {

    @BindView(R.id.image_favour)
    ImageView imageView;

    @BindView(R.id.text_favour)
    TextView textView;

    private Context context;

    public FavourViewHolder(Context context, View itemView) {
        super(itemView);
        this.context = context;
        ButterKnife.bind(this, itemView);
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    public void bind(MediaType item) {
        try {
            InputStream stream = context.getAssets().open("images/genre_" + item.getId() + ".png");
            Drawable drawable = Drawable.createFromStream(stream, null);
            imageView.setImageDrawable(drawable);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        String name = item.getName().toUpperCase();
        if (name.contains("'"))
            name = name.substring(0, name.indexOf("'"));
        else if (name.contains("/"))
            name = name.substring(0, name.indexOf("/"));
        else if (name.contains("&"))
            name = name.substring(0, name.indexOf("&"));
        textView.setText(name);
    }
}
