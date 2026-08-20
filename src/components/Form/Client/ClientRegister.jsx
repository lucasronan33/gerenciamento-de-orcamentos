import { SaveIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";
import { Form } from "..";
import { useClient } from "../../../context/Client";
import {
  clientReset,
  createClientRequest,
  updateClientRequest,
} from "../../../store/modules/client/actions";
import { isValidCpfCnpj } from "../../../utils/documents";
import { Button } from "../../Button";
import { ClientAddress } from "./ClientAddress";
import { ClientInfo } from "./ClientInfo";

export function ClientRegister() {
  const { client, resetClientState } = useClient();
  const { isLoggedIn } = useSelector((state) => state.auth || {});
  const { isLoading, success } = useSelector((state) => state.client || {});
  const dispatch = useDispatch();
  const [active, setActive] = useState("Inf. Básicas");
  const options = ["Inf. Básicas", "Endereço"];
  const tabs = [
    { key: "Inf. Básicas", component: <ClientInfo /> },
    { key: "Endereço", component: <ClientAddress /> },
  ];

  const handleButtonActive = (option) => {
    setActive(option);
  };

  const validateClientData = (data) => {
    const errors = [];

    if (!data.name || !validator.isLength(data.name, { min: 2, max: 80 })) {
      errors.push({
        field: "Nome",
        message: "deve ter entre 2 e 80 caracteres.",
      });
    }

    if (!data.phone || !validator.matches(data.phone, /^\d{11}$/)) {
      errors.push({
        field: "Telefone",
        message: "deve estar no formato (DD) 9 XXXX-XXXX.",
      });
    }

    if (data.email && !validator.isEmail(data.email)) {
      errors.push({
        field: "Email",
        message: "deve ser um e-mail valido.",
      });
    }

    if (data.cpf_cnpj && !/^\d+$/.test(data.cpf_cnpj)) {
      errors.push({
        field: "CPF/CNPJ",
        message: "deve conter apenas numeros.",
      });
    }

    if (data.cpf_cnpj && !isValidCpfCnpj(data.cpf_cnpj)) {
      errors.push({
        field: "CPF / CNPJ",
        message: "o cpf ou cnpj inserido nao e valido.",
      });
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateClientData(client);

    if (errors.length > 0) {
      errors.forEach((value) =>
        toast.error(
          <div>
            <strong>{value.field}: </strong>
            {value.message}{" "}
          </div>,
          { autoClose: 5000, hideProgressBar: true },
        ),
      );
      return;
    }

    if (!isLoggedIn) {
      toast.error(
        "Você precisa estar logado para cadastrar/atualizar um cliente!",
      );
      return;
    }
    client._id
      ? dispatch(updateClientRequest(client))
      : dispatch(createClientRequest(client));
  };

  useEffect(() => {
    if (success && isLoggedIn) {
      dispatch(clientReset());
    }
  }, [isLoggedIn, success, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) return;
    return () => {
      dispatch(clientReset());
    };
  }, [isLoggedIn, dispatch]);
  return (
    <form onSubmit={handleSubmit} className="container-settings">
      <div
        className="
          w-full
          p-5
          gap-5
          flex
          max-sm:flex-col
          rounded-4xl
          bg-button-dark
          "
      >
        {options.map((item) => (
          <Button.Nav
            key={item}
            onClick={() => handleButtonActive(item)}
            active={active}
            item={item}
            type="button"
          >
            {item}
          </Button.Nav>
        ))}
      </div>

      <Form.Root>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-budget-content ${active === tab.key ? "content-budget-active" : ""}`}
          >
            {tab.component}
          </div>
        ))}
      </Form.Root>

      <div
        className="
        flex
        justify-end
        w-full
      "
      >
        <div
          className="
          w-[50%]
          max-sm:w-full
          flex
          flex-wrap
          gap-5
      "
        >
          <Button.Cancel onClick={resetClientState}>
            <X />
            Limpar
          </Button.Cancel>

          <Button.Primary>
            <SaveIcon />
            {client?._id
              ? !isLoading
                ? "Atualizar"
                : "Atualizando..."
              : !isLoading
                ? "Cadastrar"
                : "Cadastrando..."}
          </Button.Primary>
        </div>
      </div>
    </form>
  );
}
