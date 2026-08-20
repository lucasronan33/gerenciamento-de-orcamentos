import { motion } from "framer-motion";
import {
  CircleHelp,
  Home,
  Info,
  LogOut,
  Menu,
  PackagePlus,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../store/modules/auth/actions";
import { Button } from "../Button";
const getMenuSections = () => [
  {
    title: "Principal",
    items: [
      {
        label: "Home",
        icon: Home,
        path: "/",
      },
    ],
  },
  {
    title: "Cadastros",
    items: [
      {
        label: "Cadastro de clientes",
        icon: Users,
        path: "/clients",
      },
      {
        label: "Cadastro de itens predefinidos (em desenvolvimento)",
        icon: PackagePlus,
        path: "/predefineditems",
      },
    ],
  },
  {
    title: "Configuracoes",
    items: [
      {
        label: "Configurações",
        icon: Settings,
        path: `/user/settings`,
      },
      {
        label: "Sobre Nos",
        icon: Info,
        path: "/about",
      },
      {
        label: "FAQ (em desenvolvimento)",
        icon: CircleHelp,
        path: "/faq",
      },
    ],
  },
];

export default function Sidebar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user._id);
  const menuSections = getMenuSections(userId);

  const handleNavigate = (path) => {
    navigate(path);
    document.activeElement.blur();
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (!isLoggedIn) return;
    dispatch(logoutRequest());
    document.activeElement.blur();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="
          max-md:w-full
        "
      >
        <div
          className="
          w-fit
        "
        >
          <Button.Primary
            aria-label="Abrir menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button.Primary>
        </div>
      </div>
      {isOpen && (
        <button
          className="
                    fixed
                    inset-0
                    z-20
                    w-full
                    h-full
                    bg-black/35
                    backdrop-blur-[0.5vh]
                    "
          type="button"
          aria-label="Fechar menu"
          onClick={() => {
            document.activeElement.blur();
            setIsOpen(false);
          }}
        />
      )}

      <motion.aside
        initial={{
          x: "-105%",
        }}
        animate={{ x: isOpen ? 0 : "-105%" }}
        transition={{ duration: 0.18, ease: "easeIn" }}
        whileTap={{
          x: 0,
        }}
        className={`
                    fixed
                    inset-[0_auto_0_0]
                    z-30
                    w-[min(86vw_340px)]
                    h-dvh
                    flex
                    flex-col
                    items-center
                    gap-[3vh]
                    bg-primary-dark
                    text-blueDocument
                    ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div
          className="
                    w-full
                flex
                items-center
                justify-between
                gap-[2vh]
                py-[2vh]
                border-b
                border-border-dark
                "
        >
          <div
            className="
                        px-[5vh]
                    flex
                    flex-col
                    gap-[0.5vh]
                    "
          >
            <strong
              className="
                        text-2xl"
            >
              Menu
            </strong>
            <span className="text-blueHover">Gerenciamento</span>
          </div>
          <button
            className="
                        p-[1vh]
                        rounded-[1vh]
                        "
            type="button"
            aria-label="Fechar menu"
            onClick={() => {
              document.activeElement.blur();
              setIsOpen(false);
            }}
          >
            <X
              className="
                        w-[5vh]
                        aspect-square"
            />
          </button>
        </div>

        <nav
          className="
                    w-[80%]
                    flex
                    flex-col
                    gap-[5vh]
                "
        >
          {menuSections.map((section) => (
            <section
              className="
                            w-full
                            flex
                            flex-col
                            gap-[1vh]
                            "
              key={section.title}
            >
              <h2
                className="
                            text-blueDocument
                            text-sm
                            font-bold
                            uppercase
                            "
              >
                {section.title}
              </h2>
              <div
                className="
                            flex
                            flex-col
                            gap-[2vh]
                            "
              >
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      className="
                                        w-full
                                        min-h-10
                                        py-[1.3vh]
                                        px-[1.5vh]
                                        flex
                                        flex-1
                                        items-center
                                        justify-start
                                        gap-[1.5vh]
                                        text-white
                                        bg-secondary-dark
                                        outline
                                        outline-border-dark
                                        rounded-[1vh]
                                        text-left
                                        duration-300
                                        card-icon-hover
                                        "
                      type="button"
                      key={item.label}
                      onClick={() => handleNavigate(item.path)}
                    >
                      <Icon
                        className="
                                            w-5
                                            aspect-square
                                            shrink-0
                                        "
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <section
            className="
                    w-full
                    flex
                    flex-col
                    gap-[1vh]
                    "
          >
            <Button.Cancel onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </Button.Cancel>
          </section>
        </nav>
      </motion.aside>
    </>
  );
}
