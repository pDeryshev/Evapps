import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import "./login.scss";
import { Form } from "@/components/form/form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login">
      <div className="container">
        <div className="login__wrapper">
          <Form
            className="login__form"
            title="Вход в профиль"
            inputs={[
              <Input
                key="email"
                className="custom-input"
                type="email"
                name="email"
                id="email"
                label="Логин"
              />,
              <Input
                key="password"
                className="custom-input"
                type="password"
                name="password"
                id="password"
                label="Пароль"
              />
            ]}
            buttons={[
              <Link key="register" href="/register">
                <Button
                  type="submit"
                  className="btn login__btn"
                  text="Зарегистрироваться"
                />
              </Link>,
              <Button
                key="login"
                type="submit"
                className="btn btn--acсent login__btn"
                text="Войти"
              />
            ]}
          />
        </div>
      </div>
    </div>

  )
}