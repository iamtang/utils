import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useRequest(service, options = {}) {
    const { loadingDelay, pollingInterval, debounceWait, throttleWait } =
        options;
    const source = useRef();
    const delayTimer = useRef();
    const pollingIntervalTimer = useRef();
    const debounceWaitTimer = useRef();
    const throttleWaitTime = useRef(false);
    const [loading, setLoading] = useState(false);
    const [prevParams, setPrevParams] = useState();
    const [response, setResponse] = useState({});
    const CancelToken = axios.CancelToken;

    const _setResponse = (error, data) => {
        setResponse({
            error,
            data,
        });
    };

    const _setLoading = (toggle, delay) => {
        if (delay) {
            delayTimer.current = setTimeout(() => setLoading(toggle), delay);
        } else {
            setLoading(toggle);
        }
    };

    const _fn = (_params, isPrev) => {
        const config = isPrev ? prevParams : service(_params);
        setPrevParams(config, loadingDelay);
        source.current && cancel("repeat");
        source.current = CancelToken.source();
        _setLoading(true, loadingDelay);
        axios({
            ...config,
            cancelToken: source.current.token,
        })
            .then((res) => {
                _setResponse(undefined, res.data);
                _setLoading(false);
                source.current = undefined;
                return res;
            })
            .catch((error) => {
                switch (error.message) {
                    case "destroy":
                    case "repeat":
                        break;
                    case "active":
                        source.current = undefined;
                        _setLoading(false);
                        break;
                    default:
                        source.current = undefined;
                        _setResponse(error, undefined);
                }

                return;
            })
            .finally(() => clearTimeout(delayTimer.current));
    };

    const run = (_params, isPrev) => {
        if (debounceWait) {
            clearTimeout(debounceWaitTimer.current);
            debounceWaitTimer.current = setTimeout(() => {
                _fn(_params, isPrev);
            }, debounceWait);
        } else if (throttleWait) {
            if (throttleWaitTime.current) {
                return;
            }
            setTimeout(() => {
                _fn(_params, isPrev);
                throttleWaitTime.current = false;
            }, throttleWait);
            throttleWaitTime.current = true;
        } else {
            _fn(_params, isPrev);
        }
        pollingInterval &&
            (pollingIntervalTimer.current = setTimeout(
                () => run(_params),
                pollingInterval
            ));
        return;
    };

    const refresh = () => run(null, true);

    const cancel = (txt) => {
        txt = typeof txt === "string" ? txt : "active";
        pollingInterval && clearTimeout(pollingIntervalTimer.current);
        source?.current?.cancel(txt);
        return;
    };

    useEffect(() => {
        return () => cancel("destroy");
    }, []);

    return {
        loading,
        run,
        cancel,
        refresh,
        ...response,
    };
}

