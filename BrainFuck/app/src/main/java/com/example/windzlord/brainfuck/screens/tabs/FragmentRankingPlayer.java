package com.example.windzlord.brainfuck.screens.tabs;


import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.akexorcist.roundcornerprogressbar.IconRoundCornerProgressBar;
import com.example.windzlord.brainfuck.R;
import com.example.windzlord.brainfuck.managers.ManagerBrain;
import com.example.windzlord.brainfuck.managers.ManagerFile;
import com.example.windzlord.brainfuck.managers.ManagerPreference;
import com.example.windzlord.brainfuck.managers.ManagerUserData;
import com.example.windzlord.brainfuck.objects.models.HighScore;
import com.nostra13.universalimageloader.core.ImageLoader;

import java.io.File;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

/**
 * A simple {@link Fragment} subclass.
 */
public class FragmentRankingPlayer extends Fragment {

    @BindView(R.id.progressbar_calculation)
    IconRoundCornerProgressBar barCalcu;

    @BindView(R.id.progressbar_concen)
    IconRoundCornerProgressBar barConcen;

    @BindView(R.id.progressbar_memory)
    IconRoundCornerProgressBar barMemory;

    @BindView(R.id.progressbar_observation)
    IconRoundCornerProgressBar barObser;

    @BindView(R.id.imageView_user_avatar)
    ImageView imageViewUser;

    @BindView(R.id.textView_user_name)
    TextView textViewUser;

    @BindView(R.id.textView_high_score)
    TextView textViewScore;

    @BindView(R.id.textView_calcu_score)
    TextView textViewCalcu;

    @BindView(R.id.textView_concen_score)
    TextView textViewConcen;

    @BindView(R.id.textView_observer_score)
    TextView textViewObserver;

    @BindView(R.id.textView_memory_score)
    TextView textViewMemory;

    private String userID;
    private List<HighScore> scores;
    private HighScore player;

    public void setUserID(String userID) {
        this.userID = userID;
        scores = ManagerUserData.getInstance().getScoreByUserId(userID);
        player = scores.get(0);
    }

    public FragmentRankingPlayer() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.tab_fragment_ranking_player, container, false);
        settingThingsUp(view);

        return view;
    }

    private void settingThingsUp(View view) {
        ButterKnife.bind(this, view);

        System.out.println(userID);
        setupUI();
        getProgressbar();
    }

    public void setupUI() {
        Typeface font = Typeface.createFromAsset(getContext().getAssets(), "fonts/BreeSerif.otf");
        textViewUser.setTypeface(font);
        String userName = player.getUserName();
        textViewUser.setText(userName.substring(2, userName.length() - 1));
        int neuron = 0;
        for (HighScore score : scores)
            neuron += (score.getLevel() * score.getLevel() - 1) / 2 * 300 + score.getExp();
        textViewScore.setText("Neuron " + neuron);
        ImageLoader.getInstance().displayImage(player.getUserImage(), imageViewUser);
    }

    private int scoreCalcu = 0;
    private int scoreConcen = 0;
    private int scoreMemo = 0;
    private int scoreObser = 0;

    public void getProgressbar() {
        for (HighScore score : scores) {
            scoreCalcu += score.getType().equals(ManagerBrain.CALCULATION) ? score.getScore() : 0;
            scoreConcen += score.getType().equals(ManagerBrain.CONCENTRATION) ? score.getScore() : 0;
            scoreMemo += score.getType().equals(ManagerBrain.MEMORY) ? score.getScore() : 0;
            scoreObser += score.getType().equals(ManagerBrain.OBSERVATION) ? score.getScore() : 0;
        }
        textViewCalcu.setText(scoreCalcu + "");
        textViewConcen.setText(scoreConcen + "");
        textViewObserver.setText(scoreObser + "");
        textViewMemory.setText(scoreMemo + "");

        float f = 300;
        new CountDownTimer((long) f, 1) {
            @Override
            public void onTick(long l) {
                barCalcu.setProgress((f - l) / f * scoreCalcu * 10);
                barConcen.setProgress((f - l) / f * scoreConcen * 10);
                barMemory.setProgress((f - l) / f * scoreMemo * 10);
                barObser.setProgress((f - l) / f * scoreObser * 10);
            }

            @Override
            public void onFinish() {

            }
        }.start();
    }
}