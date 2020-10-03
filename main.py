def みぎタイア(すぴーど: number):
    # みぎタイアをうごかす
    # すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED3, 0 if すぴーど >= 0 else 100, 67)
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED4, abs(すぴーど), 67)
def ひだリタイア(すぴーど: number):
    # ひだリタイアをうごかす
    # すぴーど: -100～100、まいなすでうしろにうごく
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED1, 0 if すぴーど >= 0 else 100, 67)
    PCA9685.set_led_duty_cycle(PCA9685.LEDNum.LED2, abs(すぴーど), 67)

def on_received_value(name, value):
    serial.write_value(name, value)
    # 左に行くときは右を回す、その逆も同じ
    if name == "left":
        みぎタイア(value)
    elif name == "right":
        ひだリタイア(value)
    else:
        pass
radio.on_received_value(on_received_value)

すぴーど = 0
left = 0
right = 0
basic.show_icon(IconNames.HEART)
PCA9685.reset(67)

def on_forever():
    global left, right
    cur_left  = 50 if input.button_is_pressed(Button.A) else 0
    if left != cur_left:
        left = cur_left
        serial.write_value("left", left)
        radio.send_value("left", left)
    cur_right = 50 if input.button_is_pressed(Button.B) else 0
    if right != cur_right:
        right = cur_right
        serial.write_value("right", right)
        radio.send_value("right", right)

basic.forever(on_forever)
