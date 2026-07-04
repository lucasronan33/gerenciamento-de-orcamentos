import logoUrl from '../../assets/images/logo.svg';

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                        <img src={logoUrl} alt="ORCA" className="h-8 w-8" />
                        <span className="text-lg font-extrabold">ORCA</span>
                    </div>
                    <p className="mt-3 text-muted-foreground max-w-sm">
                        Orçamentos profissionais, controle financeiro e mais tempo para o que importa: atender bem seus clientes.
                    </p>
                </div>
                <div>
                    <p className="font-semibold mb-3">Produto</p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#recursos" className="hover:text-foreground">Recursos</a></li>
                        <li><a href="#como-funciona" className="hover:text-foreground">Como funciona</a></li>
                        <li><a href="#precos" className="hover:text-foreground">Preços</a></li>
                        <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold mb-3">Empresa</p>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#contact" className="hover:text-foreground">Contato</a></li>
                        <li><a href="#terms" className="hover:text-foreground">Termos de uso</a></li>
                        <li><a href="#privacy" className="hover:text-foreground">Privacidade</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-border">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
                    <span>© {new Date().getFullYear()} ORCA. Todos os direitos reservados.</span>
                    <span>Feito para autônomos, MEIs e pequenos negócios.</span>
                </div>
            </div>
        </footer>
    );
}