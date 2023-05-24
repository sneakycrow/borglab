import ViewerList, {Viewer} from "@/components/ViewerList";

const Home = async () => {
    const viewers = await getViewers();
    return (
        <main className="flex flex-col items-center min-h-screen py-2">
            <ViewerList viewers={viewers}/>
        </main>
    )
}

const getViewers = async (): Promise<Viewer[]> => {
    try {
        const res = await fetch(`${process.env.API_URL}/users`);
        const data = await res.json();
        console.log(data.viewers)

        return data.viewers;
    } catch (e) {
        console.error(e);
        return [
            {
                id: "1",
                username: "Fake Chickenfoot",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                has_avatar: false,
            },
            {
                id: "2",
                username: "Fake Chickenfoot",
                created_at: "2021-10-10",
                updated_at: "2021-10-10",
                has_avatar: true,
            },
        ];
    }
}

export default Home;