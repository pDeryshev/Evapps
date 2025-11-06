import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import "./register.scss";
import { Form } from "@/components/form/form";

export default function RegisterPage() {
  return (
    <div className="register">
      <div className="container">
        <div className="register__wrapper">
          <Form
            className="register__form"
            title="Регистрация"
            inputs={[
              <Input
                key="email"
                className="custom-input"
                type="email"
                name="email"
                id="email"
                label="Email"
                placeholder="Email"
              />,
              <Input
                key="password"
                className="custom-input"
                type="password"
                name="password"
                id="password"
                label="Пароль"
                placeholder="Пароль"
              />,
              <Input
                key="repeat-password"
                className="custom-input"
                type="password"
                name="repeat-password"
                id="repeat-password"
                label="Повторите пароль"
                placeholder="Повторите пароль"
              />
            ]}
            buttons={[
              <Button
                key="submit"
                type="submit"
                className="btn btn--accent register__btn"
                text="Зарегистрироваться"
              />
            ]}
          />          
        </div>
      </div>

    </div>

  )
}