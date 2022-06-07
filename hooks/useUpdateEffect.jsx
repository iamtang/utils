import React, { useEffect, useRef } from "react";

export default function useUpdateEffect(effect, deps) {
    const isFirsMountRef = useRef(false);

    useEffect(() => {
        if(isFirsMountRef.current){
            return effect();
        }
        isFirsMountRef.current = true;
    }, deps)

}

