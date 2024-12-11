import { TopMenu } from "@/components";
import { auth } from "@/auth.config";
import React from "react";

export default async function BaseLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();
    const user = session?.user || null;

    return (

        <main>
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                    {user && <TopMenu user={user} />}
                    <div className="flex flex-col items-center justify-center">
                        <div className="container px-4 py-4">
                            <div className="max-w-5xl w-full mx-auto">
                                {/* This ensures that children are constrained to the max width */}
                                <div className="w-full max-w-5xl mx-auto">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}