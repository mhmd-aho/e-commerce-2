import {Header} from "@/components/header";

export default function SharedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
            <Header/>
            {children}
           </>;
}