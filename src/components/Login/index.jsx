import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import {
  googleLoginRequest,
  loginRequest,
} from "../../store/modules/auth/actions";
import { Button } from "../Button";
import { Form } from "../Form";

export default function LoginContent({ modalVisible, setModalVisible }) {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const hasGoogleClientId = Boolean(googleClientId?.trim());

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.prevPath;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email =
      validator.normalizeEmail(validator.trim(formData.email)) || "";
    const password = formData.password;
    const errors = {};

    if (!validator.isEmail(email)) errors.email = "Informe um e-mail valido.";
    if (!password) errors.password = "Informe sua senha.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    dispatch(
      loginRequest({
        email,
        password,
      }),
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      const nextPath =
        typeof redirectTo === "string" && redirectTo.startsWith("/")
          ? redirectTo
          : "/";
      navigate(nextPath, {
        replace: true,
      });
    }
  }, [isLoggedIn, navigate, redirectTo]);

  useEffect(() => {
    if (modalVisible !== "login") {
      return;
    }
  }, [modalVisible]);

  return (
    <motion.form
      onClick={(e) => e.stopPropagation()}
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      onSubmit={handleSubmit}
      className="
      z-99
      bg-accent/50
      flex
      min-h-[70vh]
      w-full
      max-w-xl
      flex-col
      items-center
      justify-around
      rounded-[2vh]
      p-[4vh]
      shadow-[-1vh_2vh_3vh_rgba(0,0,0,0.2)]
      "
    >
      <motion.header
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          delay: 0.3 - 0.2,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
        pb-3
        "
      >
        <h1
          className="
        text-5xl
        m-auto
        font-extrabold
        "
        >
          Login
        </h1>
      </motion.header>
      <div
        className="
        w-full
        flex
        flex-1
        flex-col
        place-items-center
        place-content-start
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            delay: 0.5 - 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
          w-full
          flex
          flex-col
          gap-[1vh]
          py-5
          "
        >
          <Form.Label name="email" text="E-mail" />
          <Form.Input
            name="email"
            type="email"
            placeholder="Digite seu e-mail para fazer login"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <span
              className="
            text-sm
            font-semibold
            text-error
            "
            >
              {formErrors.email}
            </span>
          )}
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            delay: 0.7 - 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
        w-full
        flex
        flex-col
        gap-[1vh]
        py-5"
        >
          <Form.Label name="password" text="Senha" />
          <Form.Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha para fazer login"
            value={formData.password}
            onChange={handleChange}
            endIcon={
              <div
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
                className="
                px-5
                text-white
                flex
                items-center
                cursor-pointer
                "
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </div>
            }
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          />
          {formErrors.password && (
            <span
              className="
            text-sm
            font-semibold
            text-error"
            >
              {formErrors.password}
            </span>
          )}
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 0,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            delay: 0.9 - 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
          onClick={() => navigate("/forgot-password")}
          className="
        flex
        h-fit
        self-end
        flex-row
        flex-wrap
        items-center
        justify-between
        gap-y-4
        mb-[7vh]
        text-secondary-text-dark
        underline
        duration-300
        hover:text-blueDocument
        cursor-pointer
        "
        >
          Esqueci minha senha
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            delay: 1.1 - 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {hasGoogleClientId ? (
            <GoogleLogin
              theme="filled_blue"
              onSuccess={(credentialResponse) => {
                dispatch(
                  googleLoginRequest({
                    credential: credentialResponse.credential,
                  }),
                );
              }}
              onError={() =>
                toast.error("Nao foi possivel iniciar o login com Google.")
              }
            />
          ) : (
            <span className="text-sm font-semibold text-error">
              Login com Google indisponivel no momento.
            </span>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          delay: 1.3 - 0.2,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
      mt-4
      flex
      w-full
      flex-col
      justify-center
      items-center
      gap-6
      sm:flex-row"
      >
        <Button.Secondary
          type="button"
          onClick={() => setModalVisible("register")}
        >
          Cadastre - se
        </Button.Secondary>
        <Button.Primary type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button.Primary>
      </motion.div>
    </motion.form>
  );
}
