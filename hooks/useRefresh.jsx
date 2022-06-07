import React, { useState } from "react";

export default function useRefresh() {
    const [refresh, setRefresh] = useState();

    const refreshFn = () => {
        setRefresh(Date.now())
    }

    return {
        refresh,
        refreshFn
    }
}

