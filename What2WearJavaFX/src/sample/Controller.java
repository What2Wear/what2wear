package sample;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;

public class Controller {
    @FXML
    Label lbStatus;
    @FXML
    Button btnSubmit;
    @FXML
    private TextField tfName;
    @FXML
    private PasswordField tfPw;
    @FXML
    private boolean ans;

    @FXML
    public void login() throws Exception {
        String name = tfName.getText();
        String pw = tfPw.getText();

        if (name.isEmpty() || pw.isEmpty()) return;

        lbStatus.setText("Approved");
        ans = alertWindow.display("Logged in", "Ready to Continue?");

        if (ans) {
            Parent profile = FXMLLoader.load(getClass().getResource("profile.fxml"));

            Main.stage.setScene(new Scene(profile, 700, 500));
            Main.stage.setTitle("Profile");
        } else {
            tfName.clear();
            tfPw.clear();
            lbStatus.setText("Cancelled");
        }
    }
}