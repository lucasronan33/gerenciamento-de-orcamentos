import { Contact, Mail, Minus, Phone, Plus, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBudget } from "../../../context/Budget";
import { fetchClientsRequest } from "../../../store/modules/client/actions";
import { maskPhone } from "../../../utils/masks";
import { Button } from "../../Button";
import { CardIcons } from "../../Cards/styled";
import { Card } from "../../DashboardsHeader/styles";
import { Subtitle } from "../../Header/styles";
import { WhatsAppIcon } from "../../Icons/WhatsAppIcon";
import { Client } from "../Client";

export function BudgetContentClient() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { budget, setBudget } = useBudget();
  const [isRegister, setIsRegister] = useState(false);
  const { success, clients, isLoadingClients } = useSelector(
    (state) => state.client || {},
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchClientsRequest());
  }, [isLoggedIn, isRegister, success, dispatch]);
  return (
    <>
      {!isRegister ? (
        !budget.client && (
          <div className="w-[50%] flex m-auto">
            <Button.Primary onClick={() => setIsRegister(true)}>
              Cadastrar novo Cliente
            </Button.Primary>
          </div>
        )
      ) : (
        <>
          <div className="w-[50%] flex m-auto">
            <Button.Cancel onClick={() => setIsRegister(false)}>
              <Button.Icon icon={X} />
              Cancelar
            </Button.Cancel>
          </div>
          <Client.Register />
        </>
      )}
      {budget.client && (
        <div className="box-client">
          <label className="initials-client-name">
            {budget.client?.name &&
              budget.client.name
                .split(" ", 3)
                .map((i) => i[0].toUpperCase())
                .join("")}
          </label>
          <div className="container-client-infos">
            <h3>{budget.client.name}</h3>
            {budget.client && (
              <div className="container-contact-client ">
                {budget.client.whatsapp && (
                  <div
                    className="
                  w-fit
                  flex
                  gap-[1vh]
                  text-slate-500
                                    "
                  >
                    <WhatsAppIcon className="contact-icon whatsapp-icon" />
                    {maskPhone(budget.client?.whatsapp)}
                  </div>
                )}
                {budget.client.phone && (
                  <div
                    className="
                  w-fit
                  flex
                  gap-[1vh]
                  text-slate-500
                                    "
                  >
                    <Phone className="contact-icon" />
                    {maskPhone(budget.client?.phone)}
                  </div>
                )}
                {budget.client.email && (
                  <div
                    className="
                  w-fit
                  flex
                  gap-[1vh]
                  text-slate-500
                                    "
                  >
                    <Mail className="contact-icon" />
                    {budget.client.email}
                  </div>
                )}
              </div>
            )}
          </div>

          <CardIcons className="icons-clients-list">
            <div
              className="card-icon links"
              onClick={() =>
                setBudget((prev) => {
                  const copy = { ...prev };
                  delete copy.client;
                  return copy;
                })
              }
            >
              <Minus />
            </div>
          </CardIcons>
        </div>
      )}
      {!budget.client && (
        <Card className="hover-container">
          <Subtitle className="title-list-clients">
            Clientes cadastrados
          </Subtitle>
          <div className="container-clients">
            {isLoadingClients ? (
              <div className="box-client">
                <div className="box-client">
                  <span>
                    <RefreshCcw size={30} />
                    Carregando clientes...
                  </span>
                </div>
              </div>
            ) : clients.length > 0 ? (
              clients.map((client, index) => (
                <div className="box-client" key={index}>
                  <label className="initials-client-name">
                    {client.name
                      .split(" ", 3)
                      .map((i) => i[0].toUpperCase())
                      .join("")}
                  </label>
                  <div className="container-client-infos">
                    <h3>{client.name}</h3>
                    {budget.client && (
                      <div className="container-contact-client ">
                        {client.whatsapp && (
                          <Subtitle className="title-list-clients phone-client">
                            <WhatsAppIcon className="contact-icon whatsapp-icon" />
                            {maskPhone(client?.whatsapp)}
                          </Subtitle>
                        )}
                        {client.phone && (
                          <Subtitle className="title-list-clients phone-client">
                            <Phone className="contact-icon" />
                            {maskPhone(client?.phone)}
                          </Subtitle>
                        )}
                        {client.email && (
                          <Subtitle className="title-list-clients phone-client">
                            <Mail className="contact-icon" />
                            {client.email}
                          </Subtitle>
                        )}
                      </div>
                    )}
                  </div>
                  <CardIcons className="icons-clients-list">
                    <div
                      className="card-icon links"
                      onClick={() => {
                        setIsRegister(false);
                        setBudget((prev) => ({
                          ...prev,
                          client: client,
                        }));
                      }}
                    >
                      <Plus />
                    </div>
                  </CardIcons>
                </div>
              ))
            ) : (
              <div className="box-client">
                <span>
                  <Contact size={30} />
                  Nenhum cliente registrado ainda
                </span>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
