function ab_button () {
    let cur_left2 = input.buttonIsPressed(Button.A) ? 50 : 0
if (left != cur_left2) {
        left = cur_left2
        serial.writeValue("left", left)
        radio.sendValue("left", left)
    }
    let cur_right2 = input.buttonIsPressed(Button.B) ? 50 : 0
if (right != cur_right2) {
        right = cur_right2
        serial.writeValue("right", right)
        radio.sendValue("right", right)
    }
}
function みぎタイア (すぴーど: number) {
    // みぎタイアをうごかす
    // すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, Math.abs(すぴーど), 67)
}
function ひだリタイア (すぴーど: number) {
    // ひだリタイアをうごかす
    // すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(すぴーど), 67)
}
function rotation () {
    let cur_left = input.rotation(Rotation.Roll) < -30 ? 50 : 0
if (input.rotation(Rotation.Pitch) < -30) {
    	
    } else if (input.rotation(Rotation.Pitch) > 30) {
        cur_left = 0 - cur_left
    } else {
        cur_left = 0
    }
    if (left != cur_left) {
        left = cur_left
        serial.writeValue("left", left)
        radio.sendValue("left", left)
    }
    let cur_right = input.rotation(Rotation.Roll) > 30 ? 50 : 0
if (input.rotation(Rotation.Pitch) < -30) {
    	
    } else if (input.rotation(Rotation.Pitch) > 30) {
        cur_right = 0 - cur_right
    } else {
        cur_right = 0
    }
    if (right != cur_right) {
        right = cur_right
        serial.writeValue("right", right)
        radio.sendValue("right", right)
    }
}
radio.onReceivedValue(function (name, value) {
    serial.writeValue(name, value)
    // 左に行くときは右を回す、その逆も同じ
    if (name == "left") {
        みぎタイア(value)
    } else if (name == "right") {
        ひだリタイア(value)
    } else {
    	
    }
})
let right = 0
let left = 0
let すぴーど = 0
PCA9685.reset(67)
basic.showIcon(IconNames.Heart)
music.playTone(2000, music.beat(BeatFraction.Quarter))
music.playTone(1000, music.beat(BeatFraction.Quarter))
basic.clearScreen()
basic.forever(function () {
    ab_button()
})
