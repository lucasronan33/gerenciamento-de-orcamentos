export const CardDashboard = ({ data }) => {
    const Icon = data.icon;
    return (
        <div
            className="
        w-fit
        flex
        flex-col
        items-start
        justify-start
        gap-[0.5vh]
        "
        >
            <div className="dashboard-background-icon">
                <Icon className={data.colorText} />
                <div className={data.colorIcon} />
            </div>
            <p className="text-slate-600">{data.title}</p>
            <p
                className={`${data.colorText}
            font-extrabold
            text-2xl
            `}
            >
                {data.content}
            </p>
        </div>
    );
};
