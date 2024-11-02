import { useEffect, useState } from "react";
import Chart from "./chart/Chart";
import orderService from "../../../services/orderService";
import { IAdminOrderResponse } from "../../../types/orderTypes";

const Dashboard = () => {
    const [totalSales, setTotalSales] = useState<number>(0)
    const [orderCount, setOrderCount] = useState<number>(0)
    const [customerCount, setCustomerCount] = useState<number>(0)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const [salesResponse, ordersResponse] = await Promise.all([
            orderService.getTotalSales(),
            orderService.getAllOrdersAdmin(),
        ]);

        setTotalSales(salesResponse.totalSales);
        setOrderCount(ordersResponse.length);

        const uniqueCustomer : string[] = [];
        ordersResponse.forEach((order : IAdminOrderResponse) => {
            if (!uniqueCustomer.includes(order.user._id)) {
                uniqueCustomer.push(order.user._id);
            }
        });
        const uniqueCustomerCount = uniqueCustomer.length;
        setCustomerCount(uniqueCustomerCount);
    }

    const items = [
        {
            title: "فروش کل",
            value: `${totalSales.toLocaleString('fa-IR')} تومان`,
        },
        {
            title: "مشتری ها",
            value: `${customerCount.toLocaleString('fa-IR')}`,
        },
        {
            title: "سفارشات",
            value: `${orderCount.toLocaleString('fa-IR')}`,
        },
    ]

    return (
    <div className="relative w-full pt-[11rem] px-[12.4rem]">
        <div className="flex flex-col items-center gap-[4.3rem] w-full">
            <div className="flex gap-20 w-[80%]">
                {items.map((item, index) => {
                    return(
                        <div key={index} className="flex flex-1 flex-col grow gap-8 rounded-[0.8rem] px-8 py-[1.6rem] bg-base-menu dark:bg-dark-base-menu">
                            <span className="bg-primary-main text-[1.6rem] text-text-button w-[4.8rem] h-[4.8rem] rounded-full flex justify-center items-center">$</span>
                            <div className="">
                                <h4 className="text-text-secondary dark:text-dark-text-secondary text-[1.6rem] font-normal">{item.title}</h4>
                                <p className="text-text-primary dark:text-dark-text-primary text-[2rem] font-bold">{item.value}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
            <Chart />
        </div>
    </div>
  )
}

export default Dashboard