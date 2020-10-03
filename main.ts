function みぎタイア(すぴーど: number) {
    //  みぎタイアをうごかす
    //  すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, Math.abs(すぴーど), 67)
}

function ひだリタイア(すぴーど: number) {
    //  ひだリタイアをうごかす
    //  すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, すぴーど >= 0 ? 0 : 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, Math.abs(すぴーど), 67)
}

radio.onReceivedValue(function on_received_value(name: string, value: number) {
    serial.writeValue(name, value)
    //  左に行くときは右を回す、その逆も同じ
    if (name == "left") {
        みぎタイア(value)
    } else if (name == "right") {
        ひだリタイア(value)
    } else {
        
    }
    
})
let すぴーど = 0
let left = 0
let right = 0
basic.showIcon(IconNames.Heart)
PCA9685.reset(67)
function rotation() {
    
    let cur_left = input.rotation(Rotation.Roll) < -30 ? 50 : 0
    if (input.rotation(Rotation.Pitch) < -30) {
        
    } else if (input.rotation(Rotation.Pitch) > 30) {
        cur_left = -cur_left
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
        cur_right = -cur_right
    } else {
        cur_right = 0
    }
    
    if (right != cur_right) {
        right = cur_right
        serial.writeValue("right", right)
        radio.sendValue("right", right)
    }
    
}

function ab_button() {
    
    let cur_left = input.buttonIsPressed(Button.A) ? 50 : 0
    if (left != cur_left) {
        left = cur_left
        serial.writeValue("left", left)
        radio.sendValue("left", left)
    }
    
    let cur_right = input.buttonIsPressed(Button.B) ? 50 : 0
    if (right != cur_right) {
        right = cur_right
        serial.writeValue("right", right)
        radio.sendValue("right", right)
    }
    
}

basic.forever(function on_forever() {
    ab_button()
})
