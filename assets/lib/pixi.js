(function(b) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = b()
    } else {
        if (typeof define === "function" && define.amd) {
            define([], b)
        } else {
            var a;
            if (typeof window !== "undefined") {
                a = window
            } else {
                if (typeof global !== "undefined") {
                    a = global
                } else {
                    if (typeof self !== "undefined") {
                        a = self
                    } else {
                        a = this
                    }
                }
            }
            a.PIXI = b()
        }
    }
}
)(function() {
    var d, b, a;
    return (function c(f, k, h) {
        function g(q, n) {
            if (!k[q]) {
                if (!f[q]) {
                    var m = typeof require == "function" && require;
                    if (!n && m) {
                        return m(q, !0)
                    }
                    if (e) {
                        return e(q, !0)
                    }
                    var p = new Error("Cannot find module '" + q + "'");
                    throw p.code = "MODULE_NOT_FOUND",
                    p
                }
                var i = k[q] = {
                    exports: {}
                };
                f[q][0].call(i.exports, function(l) {
                    var o = f[q][1][l];
                    return g(o ? o : l)
                }, i, i.exports, c, f, k, h)
            }
            return k[q].exports
        }
        var e = typeof require == "function" && require;
        for (var j = 0; j < h.length; j++) {
            g(h[j])
        }
        return g
    }
    )({
        1: [function(f, g, e) {
            (function(i) {
                f("./polyfill");
                var h = g.exports = f("./core");
                h.extras = f("./extras");
                h.filters = f("./filters");
                h.interaction = f("./interaction");
                h.loaders = f("./loaders");
                h.mesh = f("./mesh");
                h.ticker = f("./ticker");
                h.loader = new h.loaders.Loader();
                Object.assign(h, f("./deprecation"));
                i.PIXI = h
            }
            ).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }
        , {
            "./core": 28,
            "./deprecation": 76,
            "./extras": 83,
            "./filters": 100,
            "./interaction": 115,
            "./loaders": 118,
            "./mesh": 124,
            "./polyfill": 128,
            "./ticker": 131
        }],
        2: [function(f, g, e) {
            (function(h) {
                /*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
                (function() {
                    var m = {};
                    var y, t;
                    y = this;
                    if (y != null) {
                        t = y.async
                    }
                    m.noConflict = function() {
                        y.async = t;
                        return m
                    }
                    ;
                    function A(F) {
                        var G = false;
                        return function() {
                            if (G) {
                                throw new Error("Callback was already called.")
                            }
                            G = true;
                            F.apply(y, arguments)
                        }
                    }
                    var E = Object.prototype.toString;
                    var p = Array.isArray || function(F) {
                        return E.call(F) === "[object Array]"
                    }
                    ;
                    var B = function(F, H) {
                        if (F.forEach) {
                            return F.forEach(H)
                        }
                        for (var G = 0; G < F.length; G += 1) {
                            H(F[G], G, F)
                        }
                    };
                    var i = function(F, H) {
                        if (F.map) {
                            return F.map(H)
                        }
                        var G = [];
                        B(F, function(I, K, J) {
                            G.push(H(I, K, J))
                        });
                        return G
                    };
                    var D = function(F, H, G) {
                        if (F.reduce) {
                            return F.reduce(H, G)
                        }
                        B(F, function(I, K, J) {
                            G = H(G, I, K, J)
                        });
                        return G
                    };
                    var k = function(H) {
                        if (Object.keys) {
                            return Object.keys(H)
                        }
                        var G = [];
                        for (var F in H) {
                            if (H.hasOwnProperty(F)) {
                                G.push(F)
                            }
                        }
                        return G
                    };
                    if (typeof h === "undefined" || !(h.nextTick)) {
                        if (typeof setImmediate === "function") {
                            m.nextTick = function(F) {
                                setImmediate(F)
                            }
                            ;
                            m.setImmediate = m.nextTick
                        } else {
                            m.nextTick = function(F) {
                                setTimeout(F, 0)
                            }
                            ;
                            m.setImmediate = m.nextTick
                        }
                    } else {
                        m.nextTick = h.nextTick;
                        if (typeof setImmediate !== "undefined") {
                            m.setImmediate = function(F) {
                                setImmediate(F)
                            }
                        } else {
                            m.setImmediate = m.nextTick
                        }
                    }
                    m.each = function(F, I, J) {
                        J = J || function() {}
                        ;
                        if (!F.length) {
                            return J()
                        }
                        var H = 0;
                        B(F, function(K) {
                            I(K, A(G))
                        });
                        function G(K) {
                            if (K) {
                                J(K);
                                J = function() {}
                            } else {
                                H += 1;
                                if (H >= F.length) {
                                    J()
                                }
                            }
                        }
                    }
                    ;
                    m.forEach = m.each;
                    m.eachSeries = function(F, I, J) {
                        J = J || function() {}
                        ;
                        if (!F.length) {
                            return J()
                        }
                        var H = 0;
                        var G = function() {
                            I(F[H], function(K) {
                                if (K) {
                                    J(K);
                                    J = function() {}
                                } else {
                                    H += 1;
                                    if (H >= F.length) {
                                        J()
                                    } else {
                                        G()
                                    }
                                }
                            })
                        };
                        G()
                    }
                    ;
                    m.forEachSeries = m.eachSeries;
                    m.eachLimit = function(F, G, I, J) {
                        var H = o(G);
                        H.apply(null, [F, I, J])
                    }
                    ;
                    m.forEachLimit = m.eachLimit;
                    var o = function(F) {
                        return function(G, K, M) {
                            M = M || function() {}
                            ;
                            if (!G.length || F <= 0) {
                                return M()
                            }
                            var J = 0;
                            var H = 0;
                            var I = 0;
                            (function L() {
                                if (J >= G.length) {
                                    return M()
                                }
                                while (I < F && H < G.length) {
                                    H += 1;
                                    I += 1;
                                    K(G[H - 1], function(N) {
                                        if (N) {
                                            M(N);
                                            M = function() {}
                                        } else {
                                            J += 1;
                                            I -= 1;
                                            if (J >= G.length) {
                                                M()
                                            } else {
                                                L()
                                            }
                                        }
                                    })
                                }
                            }
                            )()
                        }
                    };
                    var z = function(F) {
                        return function() {
                            var G = Array.prototype.slice.call(arguments);
                            return F.apply(null, [m.each].concat(G))
                        }
                    };
                    var x = function(F, G) {
                        return function() {
                            var H = Array.prototype.slice.call(arguments);
                            return G.apply(null, [o(F)].concat(H))
                        }
                    };
                    var v = function(F) {
                        return function() {
                            var G = Array.prototype.slice.call(arguments);
                            return F.apply(null, [m.eachSeries].concat(G))
                        }
                    };
                    var q = function(I, F, H, J) {
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        if (!J) {
                            I(F, function(K, L) {
                                H(K.value, function(M) {
                                    L(M)
                                })
                            })
                        } else {
                            var G = [];
                            I(F, function(K, L) {
                                H(K.value, function(N, M) {
                                    G[K.index] = M;
                                    L(N)
                                })
                            }, function(K) {
                                J(K, G)
                            })
                        }
                    };
                    m.map = z(q);
                    m.mapSeries = v(q);
                    m.mapLimit = function(F, G, H, I) {
                        return l(G)(F, H, I)
                    }
                    ;
                    var l = function(F) {
                        return x(F, q)
                    };
                    m.reduce = function(F, G, H, I) {
                        m.eachSeries(F, function(J, K) {
                            H(G, J, function(M, L) {
                                G = L;
                                K(M)
                            })
                        }, function(J) {
                            I(J, G)
                        })
                    }
                    ;
                    m.inject = m.reduce;
                    m.foldl = m.reduce;
                    m.reduceRight = function(F, G, H, J) {
                        var I = i(F, function(K) {
                            return K
                        }).reverse();
                        m.reduce(I, G, H, J)
                    }
                    ;
                    m.foldr = m.reduceRight;
                    var C = function(I, F, H, J) {
                        var G = [];
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        I(F, function(K, L) {
                            H(K.value, function(M) {
                                if (M) {
                                    G.push(K)
                                }
                                L()
                            })
                        }, function(K) {
                            J(i(G.sort(function(M, L) {
                                return M.index - L.index
                            }), function(L) {
                                return L.value
                            }))
                        })
                    };
                    m.filter = z(C);
                    m.filterSeries = v(C);
                    m.select = m.filter;
                    m.selectSeries = m.filterSeries;
                    var u = function(I, F, H, J) {
                        var G = [];
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        I(F, function(K, L) {
                            H(K.value, function(M) {
                                if (!M) {
                                    G.push(K)
                                }
                                L()
                            })
                        }, function(K) {
                            J(i(G.sort(function(M, L) {
                                return M.index - L.index
                            }), function(L) {
                                return L.value
                            }))
                        })
                    };
                    m.reject = z(u);
                    m.rejectSeries = v(u);
                    var n = function(H, F, G, I) {
                        H(F, function(J, K) {
                            G(J, function(L) {
                                if (L) {
                                    I(J);
                                    I = function() {}
                                } else {
                                    K()
                                }
                            })
                        }, function(J) {
                            I()
                        })
                    };
                    m.detect = z(n);
                    m.detectSeries = v(n);
                    m.some = function(F, G, H) {
                        m.each(F, function(I, J) {
                            G(I, function(K) {
                                if (K) {
                                    H(true);
                                    H = function() {}
                                }
                                J()
                            })
                        }, function(I) {
                            H(false)
                        })
                    }
                    ;
                    m.any = m.some;
                    m.every = function(F, G, H) {
                        m.each(F, function(I, J) {
                            G(I, function(K) {
                                if (!K) {
                                    H(false);
                                    H = function() {}
                                }
                                J()
                            })
                        }, function(I) {
                            H(true)
                        })
                    }
                    ;
                    m.all = m.every;
                    m.sortBy = function(F, G, H) {
                        m.map(F, function(I, J) {
                            G(I, function(K, L) {
                                if (K) {
                                    J(K)
                                } else {
                                    J(null, {
                                        value: I,
                                        criteria: L
                                    })
                                }
                            })
                        }, function(K, I) {
                            if (K) {
                                return H(K)
                            } else {
                                var J = function(O, N) {
                                    var M = O.criteria
                                      , L = N.criteria;
                                    return M < L ? -1 : M > L ? 1 : 0
                                };
                                H(null, i(I.sort(J), function(L) {
                                    return L.value
                                }))
                            }
                        })
                    }
                    ;
                    m.auto = function(H, M) {
                        M = M || function() {}
                        ;
                        var N = k(H);
                        var G = N.length;
                        if (!G) {
                            return M()
                        }
                        var J = {};
                        var L = [];
                        var F = function(O) {
                            L.unshift(O)
                        };
                        var I = function(P) {
                            for (var O = 0; O < L.length; O += 1) {
                                if (L[O] === P) {
                                    L.splice(O, 1);
                                    return
                                }
                            }
                        };
                        var K = function() {
                            G--;
                            B(L.slice(0), function(O) {
                                O()
                            })
                        };
                        F(function() {
                            if (!G) {
                                var O = M;
                                M = function() {}
                                ;
                                O(null, J)
                            }
                        });
                        B(N, function(P) {
                            var O = p(H[P]) ? H[P] : [H[P]];
                            var T = function(W) {
                                var U = Array.prototype.slice.call(arguments, 1);
                                if (U.length <= 1) {
                                    U = U[0]
                                }
                                if (W) {
                                    var V = {};
                                    B(k(J), function(X) {
                                        V[X] = J[X]
                                    });
                                    V[P] = U;
                                    M(W, V);
                                    M = function() {}
                                } else {
                                    J[P] = U;
                                    m.setImmediate(K)
                                }
                            };
                            var R = O.slice(0, Math.abs(O.length - 1)) || [];
                            var Q = function() {
                                return D(R, function(V, U) {
                                    return (V && J.hasOwnProperty(U))
                                }, true) && !J.hasOwnProperty(P)
                            };
                            if (Q()) {
                                O[O.length - 1](T, J)
                            } else {
                                var S = function() {
                                    if (Q()) {
                                        I(S);
                                        O[O.length - 1](T, J)
                                    }
                                };
                                F(S)
                            }
                        })
                    }
                    ;
                    m.retry = function(J, F, K) {
                        var H = 5;
                        var G = [];
                        if (typeof J === "function") {
                            K = F;
                            F = J;
                            J = H
                        }
                        J = parseInt(J, 10) || H;
                        var I = function(N, L) {
                            var M = function(O, P) {
                                return function(Q) {
                                    O(function(S, R) {
                                        Q(!S || P, {
                                            err: S,
                                            result: R
                                        })
                                    }, L)
                                }
                            };
                            while (J) {
                                G.push(M(F, !(J -= 1)))
                            }
                            m.series(G, function(O, P) {
                                P = P[P.length - 1];
                                (N || K)(P.err, P.result)
                            })
                        };
                        return K ? I() : I
                    }
                    ;
                    m.waterfall = function(I, H) {
                        H = H || function() {}
                        ;
                        if (!p(I)) {
                            var F = new Error("First argument to waterfall must be an array of functions");
                            return H(F)
                        }
                        if (!I.length) {
                            return H()
                        }
                        var G = function(J) {
                            return function(M) {
                                if (M) {
                                    H.apply(null, arguments);
                                    H = function() {}
                                } else {
                                    var K = Array.prototype.slice.call(arguments, 1);
                                    var L = J.next();
                                    if (L) {
                                        K.push(G(L))
                                    } else {
                                        K.push(H)
                                    }
                                    m.setImmediate(function() {
                                        J.apply(null, K)
                                    })
                                }
                            }
                        };
                        G(m.iterator(I))()
                    }
                    ;
                    var j = function(G, I, H) {
                        H = H || function() {}
                        ;
                        if (p(I)) {
                            G.map(I, function(J, K) {
                                if (J) {
                                    J(function(M) {
                                        var L = Array.prototype.slice.call(arguments, 1);
                                        if (L.length <= 1) {
                                            L = L[0]
                                        }
                                        K.call(null, M, L)
                                    })
                                }
                            }, H)
                        } else {
                            var F = {};
                            G.each(k(I), function(J, K) {
                                I[J](function(M) {
                                    var L = Array.prototype.slice.call(arguments, 1);
                                    if (L.length <= 1) {
                                        L = L[0]
                                    }
                                    F[J] = L;
                                    K(M)
                                })
                            }, function(J) {
                                H(J, F)
                            })
                        }
                    };
                    m.parallel = function(G, F) {
                        j({
                            map: m.map,
                            each: m.each
                        }, G, F)
                    }
                    ;
                    m.parallelLimit = function(H, F, G) {
                        j({
                            map: l(F),
                            each: o(F)
                        }, H, G)
                    }
                    ;
                    m.series = function(H, G) {
                        G = G || function() {}
                        ;
                        if (p(H)) {
                            m.mapSeries(H, function(I, J) {
                                if (I) {
                                    I(function(L) {
                                        var K = Array.prototype.slice.call(arguments, 1);
                                        if (K.length <= 1) {
                                            K = K[0]
                                        }
                                        J.call(null, L, K)
                                    })
                                }
                            }, G)
                        } else {
                            var F = {};
                            m.eachSeries(k(H), function(I, J) {
                                H[I](function(L) {
                                    var K = Array.prototype.slice.call(arguments, 1);
                                    if (K.length <= 1) {
                                        K = K[0]
                                    }
                                    F[I] = K;
                                    J(L)
                                })
                            }, function(I) {
                                G(I, F)
                            })
                        }
                    }
                    ;
                    m.iterator = function(G) {
                        var F = function(H) {
                            var I = function() {
                                if (G.length) {
                                    G[H].apply(null, arguments)
                                }
                                return I.next()
                            };
                            I.next = function() {
                                return (H < G.length - 1) ? F(H + 1) : null
                            }
                            ;
                            return I
                        };
                        return F(0)
                    }
                    ;
                    m.apply = function(G) {
                        var F = Array.prototype.slice.call(arguments, 1);
                        return function() {
                            return G.apply(null, F.concat(Array.prototype.slice.call(arguments)))
                        }
                    }
                    ;
                    var w = function(I, F, G, J) {
                        var H = [];
                        I(F, function(L, K) {
                            G(L, function(M, N) {
                                H = H.concat(N || []);
                                K(M)
                            })
                        }, function(K) {
                            J(K, H)
                        })
                    };
                    m.concat = z(w);
                    m.concatSeries = v(w);
                    m.whilst = function(H, F, G) {
                        if (H()) {
                            F(function(I) {
                                if (I) {
                                    return G(I)
                                }
                                m.whilst(H, F, G)
                            })
                        } else {
                            G()
                        }
                    }
                    ;
                    m.doWhilst = function(F, H, G) {
                        F(function(J) {
                            if (J) {
                                return G(J)
                            }
                            var I = Array.prototype.slice.call(arguments, 1);
                            if (H.apply(null, I)) {
                                m.doWhilst(F, H, G)
                            } else {
                                G()
                            }
                        })
                    }
                    ;
                    m.until = function(H, F, G) {
                        if (!H()) {
                            F(function(I) {
                                if (I) {
                                    return G(I)
                                }
                                m.until(H, F, G)
                            })
                        } else {
                            G()
                        }
                    }
                    ;
                    m.doUntil = function(F, H, G) {
                        F(function(J) {
                            if (J) {
                                return G(J)
                            }
                            var I = Array.prototype.slice.call(arguments, 1);
                            if (!H.apply(null, I)) {
                                m.doUntil(F, H, G)
                            } else {
                                G()
                            }
                        })
                    }
                    ;
                    m.queue = function(J, H) {
                        if (H === undefined) {
                            H = 1
                        }
                        function F(L, K, N, M) {
                            if (!L.started) {
                                L.started = true
                            }
                            if (!p(K)) {
                                K = [K]
                            }
                            if (K.length == 0) {
                                return m.setImmediate(function() {
                                    if (L.drain) {
                                        L.drain()
                                    }
                                })
                            }
                            B(K, function(O) {
                                var P = {
                                    data: O,
                                    callback: typeof M === "function" ? M : null
                                };
                                if (N) {
                                    L.tasks.unshift(P)
                                } else {
                                    L.tasks.push(P)
                                }
                                if (L.saturated && L.tasks.length === L.concurrency) {
                                    L.saturated()
                                }
                                m.setImmediate(L.process)
                            })
                        }
                        var G = 0;
                        var I = {
                            tasks: [],
                            concurrency: H,
                            saturated: null,
                            empty: null,
                            drain: null,
                            started: false,
                            paused: false,
                            push: function(K, L) {
                                F(I, K, false, L)
                            },
                            kill: function() {
                                I.drain = null;
                                I.tasks = []
                            },
                            unshift: function(K, L) {
                                F(I, K, true, L)
                            },
                            process: function() {
                                if (!I.paused && G < I.concurrency && I.tasks.length) {
                                    var L = I.tasks.shift();
                                    if (I.empty && I.tasks.length === 0) {
                                        I.empty()
                                    }
                                    G += 1;
                                    var M = function() {
                                        G -= 1;
                                        if (L.callback) {
                                            L.callback.apply(L, arguments)
                                        }
                                        if (I.drain && I.tasks.length + G === 0) {
                                            I.drain()
                                        }
                                        I.process()
                                    };
                                    var K = A(M);
                                    J(L.data, K)
                                }
                            },
                            length: function() {
                                return I.tasks.length
                            },
                            running: function() {
                                return G
                            },
                            idle: function() {
                                return I.tasks.length + G === 0
                            },
                            pause: function() {
                                if (I.paused === true) {
                                    return
                                }
                                I.paused = true;
                                I.process()
                            },
                            resume: function() {
                                if (I.paused === false) {
                                    return
                                }
                                I.paused = false;
                                I.process()
                            }
                        };
                        return I
                    }
                    ;
                    m.priorityQueue = function(K, I) {
                        function H(M, L) {
                            return M.priority - L.priority
                        }
                        function G(Q, O, P) {
                            var N = -1
                              , L = Q.length - 1;
                            while (N < L) {
                                var M = N + ((L - N + 1) >>> 1);
                                if (P(O, Q[M]) >= 0) {
                                    N = M
                                } else {
                                    L = M - 1
                                }
                            }
                            return N
                        }
                        function F(N, M, L, O) {
                            if (!N.started) {
                                N.started = true
                            }
                            if (!p(M)) {
                                M = [M]
                            }
                            if (M.length == 0) {
                                return m.setImmediate(function() {
                                    if (N.drain) {
                                        N.drain()
                                    }
                                })
                            }
                            B(M, function(P) {
                                var Q = {
                                    data: P,
                                    priority: L,
                                    callback: typeof O === "function" ? O : null
                                };
                                N.tasks.splice(G(N.tasks, Q, H) + 1, 0, Q);
                                if (N.saturated && N.tasks.length === N.concurrency) {
                                    N.saturated()
                                }
                                m.setImmediate(N.process)
                            })
                        }
                        var J = m.queue(K, I);
                        J.push = function(M, L, N) {
                            F(J, M, L, N)
                        }
                        ;
                        delete J.unshift;
                        return J
                    }
                    ;
                    m.cargo = function(J, I) {
                        var F = false
                          , K = [];
                        var G = {
                            tasks: K,
                            payload: I,
                            saturated: null,
                            empty: null,
                            drain: null,
                            drained: true,
                            push: function(L, M) {
                                if (!p(L)) {
                                    L = [L]
                                }
                                B(L, function(N) {
                                    K.push({
                                        data: N,
                                        callback: typeof M === "function" ? M : null
                                    });
                                    G.drained = false;
                                    if (G.saturated && K.length === I) {
                                        G.saturated()
                                    }
                                });
                                m.setImmediate(G.process)
                            },
                            process: function H() {
                                if (F) {
                                    return
                                }
                                if (K.length === 0) {
                                    if (G.drain && !G.drained) {
                                        G.drain()
                                    }
                                    G.drained = true;
                                    return
                                }
                                var L = typeof I === "number" ? K.splice(0, I) : K.splice(0, K.length);
                                var M = i(L, function(N) {
                                    return N.data
                                });
                                if (G.empty) {
                                    G.empty()
                                }
                                F = true;
                                J(M, function() {
                                    F = false;
                                    var N = arguments;
                                    B(L, function(O) {
                                        if (O.callback) {
                                            O.callback.apply(null, N)
                                        }
                                    });
                                    H()
                                })
                            },
                            length: function() {
                                return K.length
                            },
                            running: function() {
                                return F
                            }
                        };
                        return G
                    }
                    ;
                    var r = function(F) {
                        return function(H) {
                            var G = Array.prototype.slice.call(arguments, 1);
                            H.apply(null, G.concat([function(J) {
                                var I = Array.prototype.slice.call(arguments, 1);
                                if (typeof console !== "undefined") {
                                    if (J) {
                                        if (console.error) {
                                            console.error(J)
                                        }
                                    } else {
                                        if (console[F]) {
                                            B(I, function(K) {
                                                console[F](K)
                                            })
                                        }
                                    }
                                }
                            }
                            ]))
                        }
                    };
                    m.log = r("log");
                    m.dir = r("dir");
                    m.memoize = function(J, H) {
                        var G = {};
                        var I = {};
                        H = H || function(K) {
                            return K
                        }
                        ;
                        var F = function() {
                            var K = Array.prototype.slice.call(arguments);
                            var M = K.pop();
                            var L = H.apply(null, K);
                            if (L in G) {
                                m.nextTick(function() {
                                    M.apply(null, G[L])
                                })
                            } else {
                                if (L in I) {
                                    I[L].push(M)
                                } else {
                                    I[L] = [M];
                                    J.apply(null, K.concat([function() {
                                        G[L] = arguments;
                                        var P = I[L];
                                        delete I[L];
                                        for (var O = 0, N = P.length; O < N; O++) {
                                            P[O].apply(null, arguments)
                                        }
                                    }
                                    ]))
                                }
                            }
                        };
                        F.memo = G;
                        F.unmemoized = J;
                        return F
                    }
                    ;
                    m.unmemoize = function(F) {
                        return function() {
                            return (F.unmemoized || F).apply(null, arguments)
                        }
                    }
                    ;
                    m.times = function(I, H, J) {
                        var F = [];
                        for (var G = 0; G < I; G++) {
                            F.push(G)
                        }
                        return m.map(F, H, J)
                    }
                    ;
                    m.timesSeries = function(I, H, J) {
                        var F = [];
                        for (var G = 0; G < I; G++) {
                            F.push(G)
                        }
                        return m.mapSeries(F, H, J)
                    }
                    ;
                    m.seq = function() {
                        var F = arguments;
                        return function() {
                            var H = this;
                            var G = Array.prototype.slice.call(arguments);
                            var I = G.pop();
                            m.reduce(F, G, function(K, L, J) {
                                L.apply(H, K.concat([function() {
                                    var N = arguments[0];
                                    var M = Array.prototype.slice.call(arguments, 1);
                                    J(N, M)
                                }
                                ]))
                            }, function(K, J) {
                                I.apply(H, [K].concat(J))
                            })
                        }
                    }
                    ;
                    m.compose = function() {
                        return m.seq.apply(null, Array.prototype.reverse.call(arguments))
                    }
                    ;
                    var s = function(I, G) {
                        var H = function() {
                            var K = this;
                            var J = Array.prototype.slice.call(arguments);
                            var L = J.pop();
                            return I(G, function(N, M) {
                                N.apply(K, J.concat([M]))
                            }, L)
                        };
                        if (arguments.length > 2) {
                            var F = Array.prototype.slice.call(arguments, 2);
                            return H.apply(this, F)
                        } else {
                            return H
                        }
                    };
                    m.applyEach = z(s);
                    m.applyEachSeries = v(s);
                    m.forever = function(G, H) {
                        function F(I) {
                            if (I) {
                                if (H) {
                                    return H(I)
                                }
                                throw I
                            }
                            G(F)
                        }
                        F()
                    }
                    ;
                    if (typeof g !== "undefined" && g.exports) {
                        g.exports = m
                    } else {
                        if (typeof d !== "undefined" && d.amd) {
                            d([], function() {
                                return m
                            })
                        } else {
                            y.async = m
                        }
                    }
                }())
            }
            ).call(this, f("_process"))
        }
        , {
            _process: 4
        }],
        3: [function(f, g, e) {
            (function(m) {
                function k(r, o) {
                    var n = 0;
                    for (var p = r.length - 1; p >= 0; p--) {
                        var q = r[p];
                        if (q === ".") {
                            r.splice(p, 1)
                        } else {
                            if (q === "..") {
                                r.splice(p, 1);
                                n++
                            } else {
                                if (n) {
                                    r.splice(p, 1);
                                    n--
                                }
                            }
                        }
                    }
                    if (o) {
                        for (; n--; n) {
                            r.unshift("..")
                        }
                    }
                    return r
                }
                var j = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                var h = function(n) {
                    return j.exec(n).slice(1)
                };
                e.resolve = function() {
                    var p = ""
                      , n = false;
                    for (var o = arguments.length - 1; o >= -1 && !n; o--) {
                        var q = (o >= 0) ? arguments[o] : m.cwd();
                        if (typeof q !== "string") {
                            throw new TypeError("Arguments to path.resolve must be strings")
                        } else {
                            if (!q) {
                                continue
                            }
                        }
                        p = q + "/" + p;
                        n = q.charAt(0) === "/"
                    }
                    p = k(i(p.split("/"), function(r) {
                        return !!r
                    }), !n).join("/");
                    return ((n ? "/" : "") + p) || "."
                }
                ;
                e.normalize = function(p) {
                    var o = e.isAbsolute(p)
                      , n = l(p, -1) === "/";
                    p = k(i(p.split("/"), function(q) {
                        return !!q
                    }), !o).join("/");
                    if (!p && !o) {
                        p = "."
                    }
                    if (p && n) {
                        p += "/"
                    }
                    return (o ? "/" : "") + p
                }
                ;
                e.isAbsolute = function(n) {
                    return n.charAt(0) === "/"
                }
                ;
                e.join = function() {
                    var n = Array.prototype.slice.call(arguments, 0);
                    return e.normalize(i(n, function(q, o) {
                        if (typeof q !== "string") {
                            throw new TypeError("Arguments to path.join must be strings")
                        }
                        return q
                    }).join("/"))
                }
                ;
                e.relative = function(t, u) {
                    t = e.resolve(t).substr(1);
                    u = e.resolve(u).substr(1);
                    function p(w) {
                        var y = 0;
                        for (; y < w.length; y++) {
                            if (w[y] !== "") {
                                break
                            }
                        }
                        var x = w.length - 1;
                        for (; x >= 0; x--) {
                            if (w[x] !== "") {
                                break
                            }
                        }
                        if (y > x) {
                            return []
                        }
                        return w.slice(y, x - y + 1)
                    }
                    var s = p(t.split("/"));
                    var o = p(u.split("/"));
                    var n = Math.min(s.length, o.length);
                    var v = n;
                    for (var r = 0; r < n; r++) {
                        if (s[r] !== o[r]) {
                            v = r;
                            break
                        }
                    }
                    var q = [];
                    for (var r = v; r < s.length; r++) {
                        q.push("..")
                    }
                    q = q.concat(o.slice(v));
                    return q.join("/")
                }
                ;
                e.sep = "/";
                e.delimiter = ":";
                e.dirname = function(q) {
                    var n = h(q)
                      , o = n[0]
                      , p = n[1];
                    if (!o && !p) {
                        return "."
                    }
                    if (p) {
                        p = p.substr(0, p.length - 1)
                    }
                    return o + p
                }
                ;
                e.basename = function(p, n) {
                    var o = h(p)[2];
                    if (n && o.substr(-1 * n.length) === n) {
                        o = o.substr(0, o.length - n.length)
                    }
                    return o
                }
                ;
                e.extname = function(n) {
                    return h(n)[3]
                }
                ;
                function i(n, q) {
                    if (n.filter) {
                        return n.filter(q)
                    }
                    var p = [];
                    for (var o = 0; o < n.length; o++) {
                        if (q(n[o], o, n)) {
                            p.push(n[o])
                        }
                    }
                    return p
                }
                var l = "ab".substr(-1) === "b" ? function(o, p, n) {
                    return o.substr(p, n)
                }
                : function(o, p, n) {
                    if (p < 0) {
                        p = o.length + p
                    }
                    return o.substr(p, n)
                }
            }
            ).call(this, f("_process"))
        }
        , {
            _process: 4
        }],
        4: [function(g, h, f) {
            var k = h.exports = {};
            var e = [];
            var l = false;
            function j() {
                if (l) {
                    return
                }
                l = true;
                var o;
                var m = e.length;
                while (m) {
                    o = e;
                    e = [];
                    var n = -1;
                    while (++n < m) {
                        o[n]()
                    }
                    m = e.length
                }
                l = false
            }
            k.nextTick = function(m) {
                e.push(m);
                if (!l) {
                    setTimeout(j, 0)
                }
            }
            ;
            k.title = "browser";
            k.browser = true;
            k.env = {};
            k.argv = [];
            k.version = "";
            k.versions = {};
            function i() {}
            k.on = i;
            k.addListener = i;
            k.once = i;
            k.off = i;
            k.removeListener = i;
            k.removeAllListeners = i;
            k.emit = i;
            k.binding = function(m) {
                throw new Error("process.binding is not supported")
            }
            ;
            k.cwd = function() {
                return "/"
            }
            ;
            k.chdir = function(m) {
                throw new Error("process.chdir is not supported")
            }
            ;
            k.umask = function() {
                return 0
            }
        }
        , {}],
        5: [function(f, g, e) {
            (function(h) {
                /*! http://mths.be/punycode v1.2.4 by @mathias */
                ;(function(H) {
                    var x = typeof e == "object" && e;
                    var P = typeof g == "object" && g && g.exports == x && g;
                    var G = typeof h == "object" && h;
                    if (G.global === G || G.window === G) {
                        H = G
                    }
                    var m, A = 2147483647, t = 36, v = 1, y = 26, q = 38, u = 700, w = 72, p = 128, N = "-", D = /^xn--/, l = /[^ -~]/, i = /\x2E|\u3002|\uFF0E|\uFF61/g, z = {
                        overflow: "Overflow: input needs wider integers to process",
                        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                        "invalid-input": "Invalid input"
                    }, o = t - v, J = Math.floor, F = String.fromCharCode, O;
                    function I(Q) {
                        throw RangeError(z[Q])
                    }
                    function L(S, Q) {
                        var R = S.length;
                        while (R--) {
                            S[R] = Q(S[R])
                        }
                        return S
                    }
                    function k(Q, R) {
                        return L(Q.split(i), R).join(".")
                    }
                    function s(T) {
                        var S = [], R = 0, U = T.length, V, Q;
                        while (R < U) {
                            V = T.charCodeAt(R++);
                            if (V >= 55296 && V <= 56319 && R < U) {
                                Q = T.charCodeAt(R++);
                                if ((Q & 64512) == 56320) {
                                    S.push(((V & 1023) << 10) + (Q & 1023) + 65536)
                                } else {
                                    S.push(V);
                                    R--
                                }
                            } else {
                                S.push(V)
                            }
                        }
                        return S
                    }
                    function K(Q) {
                        return L(Q, function(S) {
                            var R = "";
                            if (S > 65535) {
                                S -= 65536;
                                R += F(S >>> 10 & 1023 | 55296);
                                S = 56320 | S & 1023
                            }
                            R += F(S);
                            return R
                        }).join("")
                    }
                    function n(Q) {
                        if (Q - 48 < 10) {
                            return Q - 22
                        }
                        if (Q - 65 < 26) {
                            return Q - 65
                        }
                        if (Q - 97 < 26) {
                            return Q - 97
                        }
                        return t
                    }
                    function E(R, Q) {
                        return R + 22 + 75 * (R < 26) - ((Q != 0) << 5)
                    }
                    function j(T, R, S) {
                        var Q = 0;
                        T = S ? J(T / u) : T >> 1;
                        T += J(T / R);
                        for (; T > o * y >> 1; Q += t) {
                            T = J(T / o)
                        }
                        return J(Q + (o + 1) * T / (T + q))
                    }
                    function C(ac) {
                        var S = [], V = ac.length, X, Y = 0, R = p, Z = w, U, W, aa, Q, ad, T, ab, af, ae;
                        U = ac.lastIndexOf(N);
                        if (U < 0) {
                            U = 0
                        }
                        for (W = 0; W < U; ++W) {
                            if (ac.charCodeAt(W) >= 128) {
                                I("not-basic")
                            }
                            S.push(ac.charCodeAt(W))
                        }
                        for (aa = U > 0 ? U + 1 : 0; aa < V; ) {
                            for (Q = Y,
                            ad = 1,
                            T = t; ; T += t) {
                                if (aa >= V) {
                                    I("invalid-input")
                                }
                                ab = n(ac.charCodeAt(aa++));
                                if (ab >= t || ab > J((A - Y) / ad)) {
                                    I("overflow")
                                }
                                Y += ab * ad;
                                af = T <= Z ? v : (T >= Z + y ? y : T - Z);
                                if (ab < af) {
                                    break
                                }
                                ae = t - af;
                                if (ad > J(A / ae)) {
                                    I("overflow")
                                }
                                ad *= ae
                            }
                            X = S.length + 1;
                            Z = j(Y - Q, X, Q == 0);
                            if (J(Y / X) > A - R) {
                                I("overflow")
                            }
                            R += J(Y / X);
                            Y %= X;
                            S.splice(Y++, 0, R)
                        }
                        return K(S)
                    }
                    function r(ac) {
                        var T, ae, Z, R, aa, Y, U, Q, X, ag, ad, S = [], W, V, af, ab;
                        ac = s(ac);
                        W = ac.length;
                        T = p;
                        ae = 0;
                        aa = w;
                        for (Y = 0; Y < W; ++Y) {
                            ad = ac[Y];
                            if (ad < 128) {
                                S.push(F(ad))
                            }
                        }
                        Z = R = S.length;
                        if (R) {
                            S.push(N)
                        }
                        while (Z < W) {
                            for (U = A,
                            Y = 0; Y < W; ++Y) {
                                ad = ac[Y];
                                if (ad >= T && ad < U) {
                                    U = ad
                                }
                            }
                            V = Z + 1;
                            if (U - T > J((A - ae) / V)) {
                                I("overflow")
                            }
                            ae += (U - T) * V;
                            T = U;
                            for (Y = 0; Y < W; ++Y) {
                                ad = ac[Y];
                                if (ad < T && ++ae > A) {
                                    I("overflow")
                                }
                                if (ad == T) {
                                    for (Q = ae,
                                    X = t; ; X += t) {
                                        ag = X <= aa ? v : (X >= aa + y ? y : X - aa);
                                        if (Q < ag) {
                                            break
                                        }
                                        ab = Q - ag;
                                        af = t - ag;
                                        S.push(F(E(ag + ab % af, 0)));
                                        Q = J(ab / af)
                                    }
                                    S.push(F(E(Q, 0)));
                                    aa = j(ae, V, Z == R);
                                    ae = 0;
                                    ++Z
                                }
                            }
                            ++ae;
                            ++T
                        }
                        return S.join("")
                    }
                    function B(Q) {
                        return k(Q, function(R) {
                            return D.test(R) ? C(R.slice(4).toLowerCase()) : R
                        })
                    }
                    function M(Q) {
                        return k(Q, function(R) {
                            return l.test(R) ? "xn--" + r(R) : R
                        })
                    }
                    m = {
                        version: "1.2.4",
                        ucs2: {
                            decode: s,
                            encode: K
                        },
                        decode: C,
                        encode: r,
                        toASCII: M,
                        toUnicode: B
                    };
                    if (typeof d == "function" && typeof d.amd == "object" && d.amd) {
                        d("punycode", function() {
                            return m
                        })
                    } else {
                        if (x && !x.nodeType) {
                            if (P) {
                                P.exports = m
                            } else {
                                for (O in m) {
                                    m.hasOwnProperty(O) && (x[O] = m[O])
                                }
                            }
                        } else {
                            H.punycode = m
                        }
                    }
                }(this))
            }
            ).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }
        , {}],
        6: [function(g, h, f) {
            function i(j, k) {
                return Object.prototype.hasOwnProperty.call(j, k)
            }
            h.exports = function(p, z, y, A) {
                z = z || "&";
                y = y || "=";
                var m = {};
                if (typeof p !== "string" || p.length === 0) {
                    return m
                }
                var o = /\+/g;
                p = p.split(z);
                var s = 1000;
                if (A && typeof A.maxKeys === "number") {
                    s = A.maxKeys
                }
                var n = p.length;
                if (s > 0 && n > s) {
                    n = s
                }
                for (var l = 0; l < n; ++l) {
                    var r = p[l].replace(o, "%20"), t = r.indexOf(y), q, w, j, u;
                    if (t >= 0) {
                        q = r.substr(0, t);
                        w = r.substr(t + 1)
                    } else {
                        q = r;
                        w = ""
                    }
                    j = decodeURIComponent(q);
                    u = decodeURIComponent(w);
                    if (!i(m, j)) {
                        m[j] = u
                    } else {
                        if (e(m[j])) {
                            m[j].push(u)
                        } else {
                            m[j] = [m[j], u]
                        }
                    }
                }
                return m
            }
            ;
            var e = Array.isArray || function(j) {
                return Object.prototype.toString.call(j) === "[object Array]"
            }
        }
        , {}],
        7: [function(h, i, g) {
            var k = function(l) {
                switch (typeof l) {
                case "string":
                    return l;
                case "boolean":
                    return l ? "true" : "false";
                case "number":
                    return isFinite(l) ? l : "";
                default:
                    return ""
                }
            };
            i.exports = function(o, n, l, m) {
                n = n || "&";
                l = l || "=";
                if (o === null) {
                    o = undefined
                }
                if (typeof o === "object") {
                    return j(f(o), function(p) {
                        var q = encodeURIComponent(k(p)) + l;
                        if (e(o[p])) {
                            return j(o[p], function(r) {
                                return q + encodeURIComponent(k(r))
                            }).join(n)
                        } else {
                            return q + encodeURIComponent(k(o[p]))
                        }
                    }).join(n)
                }
                if (!m) {
                    return ""
                }
                return encodeURIComponent(k(m)) + l + encodeURIComponent(k(o))
            }
            ;
            var e = Array.isArray || function(l) {
                return Object.prototype.toString.call(l) === "[object Array]"
            }
            ;
            function j(l, o) {
                if (l.map) {
                    return l.map(o)
                }
                var n = [];
                for (var m = 0; m < l.length; m++) {
                    n.push(o(l[m], m))
                }
                return n
            }
            var f = Object.keys || function(n) {
                var m = [];
                for (var l in n) {
                    if (Object.prototype.hasOwnProperty.call(n, l)) {
                        m.push(l)
                    }
                }
                return m
            }
        }
        , {}],
        8: [function(f, g, e) {
            e.decode = e.parse = f("./decode");
            e.encode = e.stringify = f("./encode")
        }
        , {
            "./decode": 6,
            "./encode": 7
        }],
        9: [function(p, h, D) {
            var g = p("punycode");
            D.parse = A;
            D.resolve = r;
            D.resolveObject = m;
            D.format = t;
            D.Url = w;
            function w() {
                this.protocol = null;
                this.slashes = null;
                this.auth = null;
                this.host = null;
                this.port = null;
                this.hostname = null;
                this.hash = null;
                this.search = null;
                this.query = null;
                this.pathname = null;
                this.path = null;
                this.href = null
            }
            var k = /^([a-z0-9.+-]+:)/i
              , e = /:[0-9]*$/
              , n = ["<", ">", '"', "`", " ", "\r", "\n", "\t"]
              , f = ["{", "}", "|", "\\", "^", "`"].concat(n)
              , B = ["'"].concat(f)
              , C = ["%", "/", "?", ";", "#"].concat(B)
              , y = ["/", "?", "#"]
              , E = 255
              , o = /^[a-z0-9A-Z_-]{0,63}$/
              , j = /^([a-z0-9A-Z_-]{0,63})(.*)$/
              , x = {
                javascript: true,
                "javascript:": true
            }
              , v = {
                javascript: true,
                "javascript:": true
            }
              , l = {
                http: true,
                https: true,
                ftp: true,
                gopher: true,
                file: true,
                "http:": true,
                "https:": true,
                "ftp:": true,
                "gopher:": true,
                "file:": true
            }
              , i = p("querystring");
            function A(G, I, H) {
                if (G && s(G) && G instanceof w) {
                    return G
                }
                var F = new w;
                F.parse(G, I, H);
                return F
            }
            w.prototype.parse = function(K, ab, ag) {
                if (!u(K)) {
                    throw new TypeError("Parameter 'url' must be a string, not " + typeof K)
                }
                var Q = K;
                Q = Q.trim();
                var V = k.exec(Q);
                if (V) {
                    V = V[0];
                    var ah = V.toLowerCase();
                    this.protocol = ah;
                    Q = Q.substr(V.length)
                }
                if (ag || V || Q.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var I = Q.substr(0, 2) === "//";
                    if (I && !(V && v[V])) {
                        Q = Q.substr(2);
                        this.slashes = true
                    }
                }
                if (!v[V] && (I || (V && !l[V]))) {
                    var G = -1;
                    for (var ac = 0; ac < y.length; ac++) {
                        var af = Q.indexOf(y[ac]);
                        if (af !== -1 && (G === -1 || af < G)) {
                            G = af
                        }
                    }
                    var O, S;
                    if (G === -1) {
                        S = Q.lastIndexOf("@")
                    } else {
                        S = Q.lastIndexOf("@", G)
                    }
                    if (S !== -1) {
                        O = Q.slice(0, S);
                        Q = Q.slice(S + 1);
                        this.auth = decodeURIComponent(O)
                    }
                    G = -1;
                    for (var ac = 0; ac < C.length; ac++) {
                        var af = Q.indexOf(C[ac]);
                        if (af !== -1 && (G === -1 || af < G)) {
                            G = af
                        }
                    }
                    if (G === -1) {
                        G = Q.length
                    }
                    this.host = Q.slice(0, G);
                    Q = Q.slice(G);
                    this.parseHost();
                    this.hostname = this.hostname || "";
                    var J = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
                    if (!J) {
                        var N = this.hostname.split(/\./);
                        for (var ac = 0, X = N.length; ac < X; ac++) {
                            var W = N[ac];
                            if (!W) {
                                continue
                            }
                            if (!W.match(o)) {
                                var aj = "";
                                for (var aa = 0, Y = W.length; aa < Y; aa++) {
                                    if (W.charCodeAt(aa) > 127) {
                                        aj += "x"
                                    } else {
                                        aj += W[aa]
                                    }
                                }
                                if (!aj.match(o)) {
                                    var Z = N.slice(0, ac);
                                    var M = N.slice(ac + 1);
                                    var P = W.match(j);
                                    if (P) {
                                        Z.push(P[1]);
                                        M.unshift(P[2])
                                    }
                                    if (M.length) {
                                        Q = "/" + M.join(".") + Q
                                    }
                                    this.hostname = Z.join(".");
                                    break
                                }
                            }
                        }
                    }
                    if (this.hostname.length > E) {
                        this.hostname = ""
                    } else {
                        this.hostname = this.hostname.toLowerCase()
                    }
                    if (!J) {
                        var L = this.hostname.split(".");
                        var T = [];
                        for (var ac = 0; ac < L.length; ++ac) {
                            var R = L[ac];
                            T.push(R.match(/[^A-Za-z0-9_-]/) ? "xn--" + g.encode(R) : R)
                        }
                        this.hostname = T.join(".")
                    }
                    var U = this.port ? ":" + this.port : "";
                    var ad = this.hostname || "";
                    this.host = ad + U;
                    this.href += this.host;
                    if (J) {
                        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                        if (Q[0] !== "/") {
                            Q = "/" + Q
                        }
                    }
                }
                if (!x[ah]) {
                    for (var ac = 0, X = B.length; ac < X; ac++) {
                        var ai = B[ac];
                        var ak = encodeURIComponent(ai);
                        if (ak === ai) {
                            ak = escape(ai)
                        }
                        Q = Q.split(ai).join(ak)
                    }
                }
                var F = Q.indexOf("#");
                if (F !== -1) {
                    this.hash = Q.substr(F);
                    Q = Q.slice(0, F)
                }
                var H = Q.indexOf("?");
                if (H !== -1) {
                    this.search = Q.substr(H);
                    this.query = Q.substr(H + 1);
                    if (ab) {
                        this.query = i.parse(this.query)
                    }
                    Q = Q.slice(0, H)
                } else {
                    if (ab) {
                        this.search = "";
                        this.query = {}
                    }
                }
                if (Q) {
                    this.pathname = Q
                }
                if (l[ah] && this.hostname && !this.pathname) {
                    this.pathname = "/"
                }
                if (this.pathname || this.search) {
                    var U = this.pathname || "";
                    var R = this.search || "";
                    this.path = U + R
                }
                this.href = this.format();
                return this
            }
            ;
            function t(F) {
                if (u(F)) {
                    F = A(F)
                }
                if (!(F instanceof w)) {
                    return w.prototype.format.call(F)
                }
                return F.format()
            }
            w.prototype.format = function() {
                var H = this.auth || "";
                if (H) {
                    H = encodeURIComponent(H);
                    H = H.replace(/%3A/i, ":");
                    H += "@"
                }
                var L = this.protocol || ""
                  , K = this.pathname || ""
                  , J = this.hash || ""
                  , G = false
                  , I = "";
                if (this.host) {
                    G = H + this.host
                } else {
                    if (this.hostname) {
                        G = H + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
                        if (this.port) {
                            G += ":" + this.port
                        }
                    }
                }
                if (this.query && s(this.query) && Object.keys(this.query).length) {
                    I = i.stringify(this.query)
                }
                var F = this.search || (I && ("?" + I)) || "";
                if (L && L.substr(-1) !== ":") {
                    L += ":"
                }
                if (this.slashes || (!L || l[L]) && G !== false) {
                    G = "//" + (G || "");
                    if (K && K.charAt(0) !== "/") {
                        K = "/" + K
                    }
                } else {
                    if (!G) {
                        G = ""
                    }
                }
                if (J && J.charAt(0) !== "#") {
                    J = "#" + J
                }
                if (F && F.charAt(0) !== "?") {
                    F = "?" + F
                }
                K = K.replace(/[?#]/g, function(M) {
                    return encodeURIComponent(M)
                });
                F = F.replace("#", "%23");
                return L + G + K + F + J
            }
            ;
            function r(G, F) {
                return A(G, false, true).resolve(F)
            }
            w.prototype.resolve = function(F) {
                return this.resolveObject(A(F, false, true)).format()
            }
            ;
            function m(G, F) {
                if (!G) {
                    return F
                }
                return A(G, false, true).resolveObject(F)
            }
            w.prototype.resolveObject = function(V) {
                if (u(V)) {
                    var H = new w();
                    H.parse(V, false, true);
                    V = H
                }
                var L = new w();
                Object.keys(this).forEach(function(X) {
                    L[X] = this[X]
                }, this);
                L.hash = V.hash;
                if (V.href === "") {
                    L.href = L.format();
                    return L
                }
                if (V.slashes && !V.protocol) {
                    Object.keys(V).forEach(function(X) {
                        if (X !== "protocol") {
                            L[X] = V[X]
                        }
                    });
                    if (l[L.protocol] && L.hostname && !L.pathname) {
                        L.path = L.pathname = "/"
                    }
                    L.href = L.format();
                    return L
                }
                if (V.protocol && V.protocol !== L.protocol) {
                    if (!l[V.protocol]) {
                        Object.keys(V).forEach(function(X) {
                            L[X] = V[X]
                        });
                        L.href = L.format();
                        return L
                    }
                    L.protocol = V.protocol;
                    if (!V.host && !v[V.protocol]) {
                        var W = (V.pathname || "").split("/");
                        while (W.length && !(V.host = W.shift())) {}
                        if (!V.host) {
                            V.host = ""
                        }
                        if (!V.hostname) {
                            V.hostname = ""
                        }
                        if (W[0] !== "") {
                            W.unshift("")
                        }
                        if (W.length < 2) {
                            W.unshift("")
                        }
                        L.pathname = W.join("/")
                    } else {
                        L.pathname = V.pathname
                    }
                    L.search = V.search;
                    L.query = V.query;
                    L.host = V.host || "";
                    L.auth = V.auth;
                    L.hostname = V.hostname || V.host;
                    L.port = V.port;
                    if (L.pathname || L.search) {
                        var P = L.pathname || "";
                        var N = L.search || "";
                        L.path = P + N
                    }
                    L.slashes = L.slashes || V.slashes;
                    L.href = L.format();
                    return L
                }
                var O = (L.pathname && L.pathname.charAt(0) === "/")
                  , S = (V.host || V.pathname && V.pathname.charAt(0) === "/")
                  , T = (S || O || (L.host && V.pathname))
                  , I = T
                  , M = L.pathname && L.pathname.split("/") || []
                  , W = V.pathname && V.pathname.split("/") || []
                  , G = L.protocol && !l[L.protocol];
                if (G) {
                    L.hostname = "";
                    L.port = null;
                    if (L.host) {
                        if (M[0] === "") {
                            M[0] = L.host
                        } else {
                            M.unshift(L.host)
                        }
                    }
                    L.host = "";
                    if (V.protocol) {
                        V.hostname = null;
                        V.port = null;
                        if (V.host) {
                            if (W[0] === "") {
                                W[0] = V.host
                            } else {
                                W.unshift(V.host)
                            }
                        }
                        V.host = null
                    }
                    T = T && (W[0] === "" || M[0] === "")
                }
                if (S) {
                    L.host = (V.host || V.host === "") ? V.host : L.host;
                    L.hostname = (V.hostname || V.hostname === "") ? V.hostname : L.hostname;
                    L.search = V.search;
                    L.query = V.query;
                    M = W
                } else {
                    if (W.length) {
                        if (!M) {
                            M = []
                        }
                        M.pop();
                        M = M.concat(W);
                        L.search = V.search;
                        L.query = V.query
                    } else {
                        if (!q(V.search)) {
                            if (G) {
                                L.hostname = L.host = M.shift();
                                var R = L.host && L.host.indexOf("@") > 0 ? L.host.split("@") : false;
                                if (R) {
                                    L.auth = R.shift();
                                    L.host = L.hostname = R.shift()
                                }
                            }
                            L.search = V.search;
                            L.query = V.query;
                            if (!z(L.pathname) || !z(L.search)) {
                                L.path = (L.pathname ? L.pathname : "") + (L.search ? L.search : "")
                            }
                            L.href = L.format();
                            return L
                        }
                    }
                }
                if (!M.length) {
                    L.pathname = null;
                    if (L.search) {
                        L.path = "/" + L.search
                    } else {
                        L.path = null
                    }
                    L.href = L.format();
                    return L
                }
                var J = M.slice(-1)[0];
                var F = ((L.host || V.host) && (J === "." || J === "..") || J === "");
                var K = 0;
                for (var U = M.length; U >= 0; U--) {
                    J = M[U];
                    if (J == ".") {
                        M.splice(U, 1)
                    } else {
                        if (J === "..") {
                            M.splice(U, 1);
                            K++
                        } else {
                            if (K) {
                                M.splice(U, 1);
                                K--
                            }
                        }
                    }
                }
                if (!T && !I) {
                    for (; K--; K) {
                        M.unshift("..")
                    }
                }
                if (T && M[0] !== "" && (!M[0] || M[0].charAt(0) !== "/")) {
                    M.unshift("")
                }
                if (F && (M.join("/").substr(-1) !== "/")) {
                    M.push("")
                }
                var Q = M[0] === "" || (M[0] && M[0].charAt(0) === "/");
                if (G) {
                    L.hostname = L.host = Q ? "" : M.length ? M.shift() : "";
                    var R = L.host && L.host.indexOf("@") > 0 ? L.host.split("@") : false;
                    if (R) {
                        L.auth = R.shift();
                        L.host = L.hostname = R.shift()
                    }
                }
                T = T || (L.host && M.length);
                if (T && !Q) {
                    M.unshift("")
                }
                if (!M.length) {
                    L.pathname = null;
                    L.path = null
                } else {
                    L.pathname = M.join("/")
                }
                if (!z(L.pathname) || !z(L.search)) {
                    L.path = (L.pathname ? L.pathname : "") + (L.search ? L.search : "")
                }
                L.auth = V.auth || L.auth;
                L.slashes = L.slashes || V.slashes;
                L.href = L.format();
                return L
            }
            ;
            w.prototype.parseHost = function() {
                var G = this.host;
                var F = e.exec(G);
                if (F) {
                    F = F[0];
                    if (F !== ":") {
                        this.port = F.substr(1)
                    }
                    G = G.substr(0, G.length - F.length)
                }
                if (G) {
                    this.hostname = G
                }
            }
            ;
            function u(F) {
                return typeof F === "string"
            }
            function s(F) {
                return typeof F === "object" && F !== null
            }
            function z(F) {
                return F === null
            }
            function q(F) {
                return F == null
            }
        }
        , {
            punycode: 5,
            querystring: 8
        }],
        10: [function(h, g, i) {
            function p(s, q, r) {
                this.fn = s;
                this.context = q;
                this.once = r || false
            }
            function o() {}
            o.prototype._events = undefined;
            o.prototype.listeners = function l(u, t) {
                var w = "~" + u
                  , v = this._events && this._events[w];
                if (t) {
                    return !!v
                }
                if (!v) {
                    return []
                }
                if (this._events[w].fn) {
                    return [this._events[w].fn]
                }
                for (var s = 0, r = this._events[w].length, q = new Array(r); s < r; s++) {
                    q[s] = this._events[w][s].fn
                }
                return q
            }
            ;
            o.prototype.emit = function m(r, t, s, q, C, B) {
                var x = "~" + r;
                if (!this._events || !this._events[x]) {
                    return false
                }
                var A = this._events[x], y = arguments.length, z, w;
                if ("function" === typeof A.fn) {
                    if (A.once) {
                        this.removeListener(r, A.fn, undefined, true)
                    }
                    switch (y) {
                    case 1:
                        return A.fn.call(A.context),
                        true;
                    case 2:
                        return A.fn.call(A.context, t),
                        true;
                    case 3:
                        return A.fn.call(A.context, t, s),
                        true;
                    case 4:
                        return A.fn.call(A.context, t, s, q),
                        true;
                    case 5:
                        return A.fn.call(A.context, t, s, q, C),
                        true;
                    case 6:
                        return A.fn.call(A.context, t, s, q, C, B),
                        true
                    }
                    for (w = 1,
                    z = new Array(y - 1); w < y; w++) {
                        z[w - 1] = arguments[w]
                    }
                    A.fn.apply(A.context, z)
                } else {
                    var u = A.length, v;
                    for (w = 0; w < u; w++) {
                        if (A[w].once) {
                            this.removeListener(r, A[w].fn, undefined, true)
                        }
                        switch (y) {
                        case 1:
                            A[w].fn.call(A[w].context);
                            break;
                        case 2:
                            A[w].fn.call(A[w].context, t);
                            break;
                        case 3:
                            A[w].fn.call(A[w].context, t, s);
                            break;
                        default:
                            if (!z) {
                                for (v = 1,
                                z = new Array(y - 1); v < y; v++) {
                                    z[v - 1] = arguments[v]
                                }
                            }
                            A[w].fn.apply(A[w].context, z)
                        }
                    }
                }
                return true
            }
            ;
            o.prototype.on = function k(s, r, q) {
                var u = new p(r,q || this)
                  , t = "~" + s;
                if (!this._events) {
                    this._events = {}
                }
                if (!this._events[t]) {
                    this._events[t] = u
                } else {
                    if (!this._events[t].fn) {
                        this._events[t].push(u)
                    } else {
                        this._events[t] = [this._events[t], u]
                    }
                }
                return this
            }
            ;
            o.prototype.once = function f(s, r, q) {
                var u = new p(r,q || this,true)
                  , t = "~" + s;
                if (!this._events) {
                    this._events = {}
                }
                if (!this._events[t]) {
                    this._events[t] = u
                } else {
                    if (!this._events[t].fn) {
                        this._events[t].push(u)
                    } else {
                        this._events[t] = [this._events[t], u]
                    }
                }
                return this
            }
            ;
            o.prototype.removeListener = function j(q, x, s, r) {
                var v = "~" + q;
                if (!this._events || !this._events[v]) {
                    return this
                }
                var w = this._events[v]
                  , y = [];
                if (x) {
                    if (w.fn) {
                        if (w.fn !== x || (r && !w.once) || (s && w.context !== s)) {
                            y.push(w)
                        }
                    } else {
                        for (var u = 0, t = w.length; u < t; u++) {
                            if (w[u].fn !== x || (r && !w[u].once) || (s && w[u].context !== s)) {
                                y.push(w[u])
                            }
                        }
                    }
                }
                if (y.length) {
                    this._events[v] = y.length === 1 ? y[0] : y
                } else {
                    delete this._events[v]
                }
                return this
            }
            ;
            o.prototype.removeAllListeners = function n(q) {
                if (!this._events) {
                    return this
                }
                if (q) {
                    delete this._events["~" + q]
                } else {
                    this._events = {}
                }
                return this
            }
            ;
            o.prototype.off = o.prototype.removeListener;
            o.prototype.addListener = o.prototype.on;
            o.prototype.setMaxListeners = function e() {
                return this
            }
            ;
            g.exports = o
        }
        , {}],
        11: [function(f, g, e) {
            function h(i) {
                if (i == null) {
                    throw new TypeError("Object.assign cannot be called with null or undefined")
                }
                return Object(i)
            }
            g.exports = Object.assign || function(n, m) {
                var p;
                var l;
                var o = h(n);
                for (var k = 1; k < arguments.length; k++) {
                    p = arguments[k];
                    l = Object.keys(Object(p));
                    for (var j = 0; j < l.length; j++) {
                        o[l[j]] = p[l[j]]
                    }
                }
                return o
            }
        }
        , {}],
        12: [function(f, g, e) {
            (function(h) {
                /*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
                (function() {
                    var m = {};
                    var y, t;
                    y = this;
                    if (y != null) {
                        t = y.async
                    }
                    m.noConflict = function() {
                        y.async = t;
                        return m
                    }
                    ;
                    function A(F) {
                        var G = false;
                        return function() {
                            if (G) {
                                throw new Error("Callback was already called.")
                            }
                            G = true;
                            F.apply(y, arguments)
                        }
                    }
                    var E = Object.prototype.toString;
                    var p = Array.isArray || function(F) {
                        return E.call(F) === "[object Array]"
                    }
                    ;
                    var B = function(F, H) {
                        if (F.forEach) {
                            return F.forEach(H)
                        }
                        for (var G = 0; G < F.length; G += 1) {
                            H(F[G], G, F)
                        }
                    };
                    var i = function(F, H) {
                        if (F.map) {
                            return F.map(H)
                        }
                        var G = [];
                        B(F, function(I, K, J) {
                            G.push(H(I, K, J))
                        });
                        return G
                    };
                    var D = function(F, H, G) {
                        if (F.reduce) {
                            return F.reduce(H, G)
                        }
                        B(F, function(I, K, J) {
                            G = H(G, I, K, J)
                        });
                        return G
                    };
                    var k = function(H) {
                        if (Object.keys) {
                            return Object.keys(H)
                        }
                        var G = [];
                        for (var F in H) {
                            if (H.hasOwnProperty(F)) {
                                G.push(F)
                            }
                        }
                        return G
                    };
                    if (typeof h === "undefined" || !(h.nextTick)) {
                        if (typeof setImmediate === "function") {
                            m.nextTick = function(F) {
                                setImmediate(F)
                            }
                            ;
                            m.setImmediate = m.nextTick
                        } else {
                            m.nextTick = function(F) {
                                setTimeout(F, 0)
                            }
                            ;
                            m.setImmediate = m.nextTick
                        }
                    } else {
                        m.nextTick = h.nextTick;
                        if (typeof setImmediate !== "undefined") {
                            m.setImmediate = function(F) {
                                setImmediate(F)
                            }
                        } else {
                            m.setImmediate = m.nextTick
                        }
                    }
                    m.each = function(F, I, J) {
                        J = J || function() {}
                        ;
                        if (!F.length) {
                            return J()
                        }
                        var H = 0;
                        B(F, function(K) {
                            I(K, A(G))
                        });
                        function G(K) {
                            if (K) {
                                J(K);
                                J = function() {}
                            } else {
                                H += 1;
                                if (H >= F.length) {
                                    J()
                                }
                            }
                        }
                    }
                    ;
                    m.forEach = m.each;
                    m.eachSeries = function(F, I, J) {
                        J = J || function() {}
                        ;
                        if (!F.length) {
                            return J()
                        }
                        var H = 0;
                        var G = function() {
                            I(F[H], function(K) {
                                if (K) {
                                    J(K);
                                    J = function() {}
                                } else {
                                    H += 1;
                                    if (H >= F.length) {
                                        J()
                                    } else {
                                        G()
                                    }
                                }
                            })
                        };
                        G()
                    }
                    ;
                    m.forEachSeries = m.eachSeries;
                    m.eachLimit = function(F, G, I, J) {
                        var H = o(G);
                        H.apply(null, [F, I, J])
                    }
                    ;
                    m.forEachLimit = m.eachLimit;
                    var o = function(F) {
                        return function(G, K, M) {
                            M = M || function() {}
                            ;
                            if (!G.length || F <= 0) {
                                return M()
                            }
                            var J = 0;
                            var H = 0;
                            var I = 0;
                            (function L() {
                                if (J >= G.length) {
                                    return M()
                                }
                                while (I < F && H < G.length) {
                                    H += 1;
                                    I += 1;
                                    K(G[H - 1], function(N) {
                                        if (N) {
                                            M(N);
                                            M = function() {}
                                        } else {
                                            J += 1;
                                            I -= 1;
                                            if (J >= G.length) {
                                                M()
                                            } else {
                                                L()
                                            }
                                        }
                                    })
                                }
                            }
                            )()
                        }
                    };
                    var z = function(F) {
                        return function() {
                            var G = Array.prototype.slice.call(arguments);
                            return F.apply(null, [m.each].concat(G))
                        }
                    };
                    var x = function(F, G) {
                        return function() {
                            var H = Array.prototype.slice.call(arguments);
                            return G.apply(null, [o(F)].concat(H))
                        }
                    };
                    var v = function(F) {
                        return function() {
                            var G = Array.prototype.slice.call(arguments);
                            return F.apply(null, [m.eachSeries].concat(G))
                        }
                    };
                    var q = function(I, F, H, J) {
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        if (!J) {
                            I(F, function(K, L) {
                                H(K.value, function(M) {
                                    L(M)
                                })
                            })
                        } else {
                            var G = [];
                            I(F, function(K, L) {
                                H(K.value, function(N, M) {
                                    G[K.index] = M;
                                    L(N)
                                })
                            }, function(K) {
                                J(K, G)
                            })
                        }
                    };
                    m.map = z(q);
                    m.mapSeries = v(q);
                    m.mapLimit = function(F, G, H, I) {
                        return l(G)(F, H, I)
                    }
                    ;
                    var l = function(F) {
                        return x(F, q)
                    };
                    m.reduce = function(F, G, H, I) {
                        m.eachSeries(F, function(J, K) {
                            H(G, J, function(M, L) {
                                G = L;
                                K(M)
                            })
                        }, function(J) {
                            I(J, G)
                        })
                    }
                    ;
                    m.inject = m.reduce;
                    m.foldl = m.reduce;
                    m.reduceRight = function(F, G, H, J) {
                        var I = i(F, function(K) {
                            return K
                        }).reverse();
                        m.reduce(I, G, H, J)
                    }
                    ;
                    m.foldr = m.reduceRight;
                    var C = function(I, F, H, J) {
                        var G = [];
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        I(F, function(K, L) {
                            H(K.value, function(M) {
                                if (M) {
                                    G.push(K)
                                }
                                L()
                            })
                        }, function(K) {
                            J(i(G.sort(function(M, L) {
                                return M.index - L.index
                            }), function(L) {
                                return L.value
                            }))
                        })
                    };
                    m.filter = z(C);
                    m.filterSeries = v(C);
                    m.select = m.filter;
                    m.selectSeries = m.filterSeries;
                    var u = function(I, F, H, J) {
                        var G = [];
                        F = i(F, function(K, L) {
                            return {
                                index: L,
                                value: K
                            }
                        });
                        I(F, function(K, L) {
                            H(K.value, function(M) {
                                if (!M) {
                                    G.push(K)
                                }
                                L()
                            })
                        }, function(K) {
                            J(i(G.sort(function(M, L) {
                                return M.index - L.index
                            }), function(L) {
                                return L.value
                            }))
                        })
                    };
                    m.reject = z(u);
                    m.rejectSeries = v(u);
                    var n = function(H, F, G, I) {
                        H(F, function(J, K) {
                            G(J, function(L) {
                                if (L) {
                                    I(J);
                                    I = function() {}
                                } else {
                                    K()
                                }
                            })
                        }, function(J) {
                            I()
                        })
                    };
                    m.detect = z(n);
                    m.detectSeries = v(n);
                    m.some = function(F, G, H) {
                        m.each(F, function(I, J) {
                            G(I, function(K) {
                                if (K) {
                                    H(true);
                                    H = function() {}
                                }
                                J()
                            })
                        }, function(I) {
                            H(false)
                        })
                    }
                    ;
                    m.any = m.some;
                    m.every = function(F, G, H) {
                        m.each(F, function(I, J) {
                            G(I, function(K) {
                                if (!K) {
                                    H(false);
                                    H = function() {}
                                }
                                J()
                            })
                        }, function(I) {
                            H(true)
                        })
                    }
                    ;
                    m.all = m.every;
                    m.sortBy = function(F, G, H) {
                        m.map(F, function(I, J) {
                            G(I, function(K, L) {
                                if (K) {
                                    J(K)
                                } else {
                                    J(null, {
                                        value: I,
                                        criteria: L
                                    })
                                }
                            })
                        }, function(K, I) {
                            if (K) {
                                return H(K)
                            } else {
                                var J = function(O, N) {
                                    var M = O.criteria
                                      , L = N.criteria;
                                    return M < L ? -1 : M > L ? 1 : 0
                                };
                                H(null, i(I.sort(J), function(L) {
                                    return L.value
                                }))
                            }
                        })
                    }
                    ;
                    m.auto = function(H, M) {
                        M = M || function() {}
                        ;
                        var N = k(H);
                        var G = N.length;
                        if (!G) {
                            return M()
                        }
                        var J = {};
                        var L = [];
                        var F = function(O) {
                            L.unshift(O)
                        };
                        var I = function(P) {
                            for (var O = 0; O < L.length; O += 1) {
                                if (L[O] === P) {
                                    L.splice(O, 1);
                                    return
                                }
                            }
                        };
                        var K = function() {
                            G--;
                            B(L.slice(0), function(O) {
                                O()
                            })
                        };
                        F(function() {
                            if (!G) {
                                var O = M;
                                M = function() {}
                                ;
                                O(null, J)
                            }
                        });
                        B(N, function(P) {
                            var O = p(H[P]) ? H[P] : [H[P]];
                            var T = function(W) {
                                var U = Array.prototype.slice.call(arguments, 1);
                                if (U.length <= 1) {
                                    U = U[0]
                                }
                                if (W) {
                                    var V = {};
                                    B(k(J), function(X) {
                                        V[X] = J[X]
                                    });
                                    V[P] = U;
                                    M(W, V);
                                    M = function() {}
                                } else {
                                    J[P] = U;
                                    m.setImmediate(K)
                                }
                            };
                            var R = O.slice(0, Math.abs(O.length - 1)) || [];
                            var Q = function() {
                                return D(R, function(V, U) {
                                    return (V && J.hasOwnProperty(U))
                                }, true) && !J.hasOwnProperty(P)
                            };
                            if (Q()) {
                                O[O.length - 1](T, J)
                            } else {
                                var S = function() {
                                    if (Q()) {
                                        I(S);
                                        O[O.length - 1](T, J)
                                    }
                                };
                                F(S)
                            }
                        })
                    }
                    ;
                    m.retry = function(J, F, K) {
                        var H = 5;
                        var G = [];
                        if (typeof J === "function") {
                            K = F;
                            F = J;
                            J = H
                        }
                        J = parseInt(J, 10) || H;
                        var I = function(N, L) {
                            var M = function(O, P) {
                                return function(Q) {
                                    O(function(S, R) {
                                        Q(!S || P, {
                                            err: S,
                                            result: R
                                        })
                                    }, L)
                                }
                            };
                            while (J) {
                                G.push(M(F, !(J -= 1)))
                            }
                            m.series(G, function(O, P) {
                                P = P[P.length - 1];
                                (N || K)(P.err, P.result)
                            })
                        };
                        return K ? I() : I
                    }
                    ;
                    m.waterfall = function(I, H) {
                        H = H || function() {}
                        ;
                        if (!p(I)) {
                            var F = new Error("First argument to waterfall must be an array of functions");
                            return H(F)
                        }
                        if (!I.length) {
                            return H()
                        }
                        var G = function(J) {
                            return function(M) {
                                if (M) {
                                    H.apply(null, arguments);
                                    H = function() {}
                                } else {
                                    var K = Array.prototype.slice.call(arguments, 1);
                                    var L = J.next();
                                    if (L) {
                                        K.push(G(L))
                                    } else {
                                        K.push(H)
                                    }
                                    m.setImmediate(function() {
                                        J.apply(null, K)
                                    })
                                }
                            }
                        };
                        G(m.iterator(I))()
                    }
                    ;
                    var j = function(G, I, H) {
                        H = H || function() {}
                        ;
                        if (p(I)) {
                            G.map(I, function(J, K) {
                                if (J) {
                                    J(function(M) {
                                        var L = Array.prototype.slice.call(arguments, 1);
                                        if (L.length <= 1) {
                                            L = L[0]
                                        }
                                        K.call(null, M, L)
                                    })
                                }
                            }, H)
                        } else {
                            var F = {};
                            G.each(k(I), function(J, K) {
                                I[J](function(M) {
                                    var L = Array.prototype.slice.call(arguments, 1);
                                    if (L.length <= 1) {
                                        L = L[0]
                                    }
                                    F[J] = L;
                                    K(M)
                                })
                            }, function(J) {
                                H(J, F)
                            })
                        }
                    };
                    m.parallel = function(G, F) {
                        j({
                            map: m.map,
                            each: m.each
                        }, G, F)
                    }
                    ;
                    m.parallelLimit = function(H, F, G) {
                        j({
                            map: l(F),
                            each: o(F)
                        }, H, G)
                    }
                    ;
                    m.series = function(H, G) {
                        G = G || function() {}
                        ;
                        if (p(H)) {
                            m.mapSeries(H, function(I, J) {
                                if (I) {
                                    I(function(L) {
                                        var K = Array.prototype.slice.call(arguments, 1);
                                        if (K.length <= 1) {
                                            K = K[0]
                                        }
                                        J.call(null, L, K)
                                    })
                                }
                            }, G)
                        } else {
                            var F = {};
                            m.eachSeries(k(H), function(I, J) {
                                H[I](function(L) {
                                    var K = Array.prototype.slice.call(arguments, 1);
                                    if (K.length <= 1) {
                                        K = K[0]
                                    }
                                    F[I] = K;
                                    J(L)
                                })
                            }, function(I) {
                                G(I, F)
                            })
                        }
                    }
                    ;
                    m.iterator = function(G) {
                        var F = function(H) {
                            var I = function() {
                                if (G.length) {
                                    G[H].apply(null, arguments)
                                }
                                return I.next()
                            };
                            I.next = function() {
                                return (H < G.length - 1) ? F(H + 1) : null
                            }
                            ;
                            return I
                        };
                        return F(0)
                    }
                    ;
                    m.apply = function(G) {
                        var F = Array.prototype.slice.call(arguments, 1);
                        return function() {
                            return G.apply(null, F.concat(Array.prototype.slice.call(arguments)))
                        }
                    }
                    ;
                    var w = function(I, F, G, J) {
                        var H = [];
                        I(F, function(L, K) {
                            G(L, function(M, N) {
                                H = H.concat(N || []);
                                K(M)
                            })
                        }, function(K) {
                            J(K, H)
                        })
                    };
                    m.concat = z(w);
                    m.concatSeries = v(w);
                    m.whilst = function(H, F, G) {
                        if (H()) {
                            F(function(I) {
                                if (I) {
                                    return G(I)
                                }
                                m.whilst(H, F, G)
                            })
                        } else {
                            G()
                        }
                    }
                    ;
                    m.doWhilst = function(F, H, G) {
                        F(function(J) {
                            if (J) {
                                return G(J)
                            }
                            var I = Array.prototype.slice.call(arguments, 1);
                            if (H.apply(null, I)) {
                                m.doWhilst(F, H, G)
                            } else {
                                G()
                            }
                        })
                    }
                    ;
                    m.until = function(H, F, G) {
                        if (!H()) {
                            F(function(I) {
                                if (I) {
                                    return G(I)
                                }
                                m.until(H, F, G)
                            })
                        } else {
                            G()
                        }
                    }
                    ;
                    m.doUntil = function(F, H, G) {
                        F(function(J) {
                            if (J) {
                                return G(J)
                            }
                            var I = Array.prototype.slice.call(arguments, 1);
                            if (!H.apply(null, I)) {
                                m.doUntil(F, H, G)
                            } else {
                                G()
                            }
                        })
                    }
                    ;
                    m.queue = function(J, H) {
                        if (H === undefined) {
                            H = 1
                        }
                        function F(L, K, N, M) {
                            if (!L.started) {
                                L.started = true
                            }
                            if (!p(K)) {
                                K = [K]
                            }
                            if (K.length == 0) {
                                return m.setImmediate(function() {
                                    if (L.drain) {
                                        L.drain()
                                    }
                                })
                            }
                            B(K, function(O) {
                                var P = {
                                    data: O,
                                    callback: typeof M === "function" ? M : null
                                };
                                if (N) {
                                    L.tasks.unshift(P)
                                } else {
                                    L.tasks.push(P)
                                }
                                if (L.saturated && L.tasks.length === L.concurrency) {
                                    L.saturated()
                                }
                                m.setImmediate(L.process)
                            })
                        }
                        var G = 0;
                        var I = {
                            tasks: [],
                            concurrency: H,
                            saturated: null,
                            empty: null,
                            drain: null,
                            started: false,
                            paused: false,
                            push: function(K, L) {
                                F(I, K, false, L)
                            },
                            kill: function() {
                                I.drain = null;
                                I.tasks = []
                            },
                            unshift: function(K, L) {
                                F(I, K, true, L)
                            },
                            process: function() {
                                if (!I.paused && G < I.concurrency && I.tasks.length) {
                                    var L = I.tasks.shift();
                                    if (I.empty && I.tasks.length === 0) {
                                        I.empty()
                                    }
                                    G += 1;
                                    var M = function() {
                                        G -= 1;
                                        if (L.callback) {
                                            L.callback.apply(L, arguments)
                                        }
                                        if (I.drain && I.tasks.length + G === 0) {
                                            I.drain()
                                        }
                                        I.process()
                                    };
                                    var K = A(M);
                                    J(L.data, K)
                                }
                            },
                            length: function() {
                                return I.tasks.length
                            },
                            running: function() {
                                return G
                            },
                            idle: function() {
                                return I.tasks.length + G === 0
                            },
                            pause: function() {
                                if (I.paused === true) {
                                    return
                                }
                                I.paused = true;
                                I.process()
                            },
                            resume: function() {
                                if (I.paused === false) {
                                    return
                                }
                                I.paused = false;
                                I.process()
                            }
                        };
                        return I
                    }
                    ;
                    m.priorityQueue = function(K, I) {
                        function H(M, L) {
                            return M.priority - L.priority
                        }
                        function G(Q, O, P) {
                            var N = -1
                              , L = Q.length - 1;
                            while (N < L) {
                                var M = N + ((L - N + 1) >>> 1);
                                if (P(O, Q[M]) >= 0) {
                                    N = M
                                } else {
                                    L = M - 1
                                }
                            }
                            return N
                        }
                        function F(N, M, L, O) {
                            if (!N.started) {
                                N.started = true
                            }
                            if (!p(M)) {
                                M = [M]
                            }
                            if (M.length == 0) {
                                return m.setImmediate(function() {
                                    if (N.drain) {
                                        N.drain()
                                    }
                                })
                            }
                            B(M, function(P) {
                                var Q = {
                                    data: P,
                                    priority: L,
                                    callback: typeof O === "function" ? O : null
                                };
                                N.tasks.splice(G(N.tasks, Q, H) + 1, 0, Q);
                                if (N.saturated && N.tasks.length === N.concurrency) {
                                    N.saturated()
                                }
                                m.setImmediate(N.process)
                            })
                        }
                        var J = m.queue(K, I);
                        J.push = function(M, L, N) {
                            F(J, M, L, N)
                        }
                        ;
                        delete J.unshift;
                        return J
                    }
                    ;
                    m.cargo = function(J, I) {
                        var F = false
                          , K = [];
                        var G = {
                            tasks: K,
                            payload: I,
                            saturated: null,
                            empty: null,
                            drain: null,
                            drained: true,
                            push: function(L, M) {
                                if (!p(L)) {
                                    L = [L]
                                }
                                B(L, function(N) {
                                    K.push({
                                        data: N,
                                        callback: typeof M === "function" ? M : null
                                    });
                                    G.drained = false;
                                    if (G.saturated && K.length === I) {
                                        G.saturated()
                                    }
                                });
                                m.setImmediate(G.process)
                            },
                            process: function H() {
                                if (F) {
                                    return
                                }
                                if (K.length === 0) {
                                    if (G.drain && !G.drained) {
                                        G.drain()
                                    }
                                    G.drained = true;
                                    return
                                }
                                var L = typeof I === "number" ? K.splice(0, I) : K.splice(0, K.length);
                                var M = i(L, function(N) {
                                    return N.data
                                });
                                if (G.empty) {
                                    G.empty()
                                }
                                F = true;
                                J(M, function() {
                                    F = false;
                                    var N = arguments;
                                    B(L, function(O) {
                                        if (O.callback) {
                                            O.callback.apply(null, N)
                                        }
                                    });
                                    H()
                                })
                            },
                            length: function() {
                                return K.length
                            },
                            running: function() {
                                return F
                            }
                        };
                        return G
                    }
                    ;
                    var r = function(F) {
                        return function(H) {
                            var G = Array.prototype.slice.call(arguments, 1);
                            H.apply(null, G.concat([function(J) {
                                var I = Array.prototype.slice.call(arguments, 1);
                                if (typeof console !== "undefined") {
                                    if (J) {
                                        if (console.error) {
                                            console.error(J)
                                        }
                                    } else {
                                        if (console[F]) {
                                            B(I, function(K) {
                                                console[F](K)
                                            })
                                        }
                                    }
                                }
                            }
                            ]))
                        }
                    };
                    m.log = r("log");
                    m.dir = r("dir");
                    m.memoize = function(J, H) {
                        var G = {};
                        var I = {};
                        H = H || function(K) {
                            return K
                        }
                        ;
                        var F = function() {
                            var K = Array.prototype.slice.call(arguments);
                            var M = K.pop();
                            var L = H.apply(null, K);
                            if (L in G) {
                                m.nextTick(function() {
                                    M.apply(null, G[L])
                                })
                            } else {
                                if (L in I) {
                                    I[L].push(M)
                                } else {
                                    I[L] = [M];
                                    J.apply(null, K.concat([function() {
                                        G[L] = arguments;
                                        var P = I[L];
                                        delete I[L];
                                        for (var O = 0, N = P.length; O < N; O++) {
                                            P[O].apply(null, arguments)
                                        }
                                    }
                                    ]))
                                }
                            }
                        };
                        F.memo = G;
                        F.unmemoized = J;
                        return F
                    }
                    ;
                    m.unmemoize = function(F) {
                        return function() {
                            return (F.unmemoized || F).apply(null, arguments)
                        }
                    }
                    ;
                    m.times = function(I, H, J) {
                        var F = [];
                        for (var G = 0; G < I; G++) {
                            F.push(G)
                        }
                        return m.map(F, H, J)
                    }
                    ;
                    m.timesSeries = function(I, H, J) {
                        var F = [];
                        for (var G = 0; G < I; G++) {
                            F.push(G)
                        }
                        return m.mapSeries(F, H, J)
                    }
                    ;
                    m.seq = function() {
                        var F = arguments;
                        return function() {
                            var H = this;
                            var G = Array.prototype.slice.call(arguments);
                            var I = G.pop();
                            m.reduce(F, G, function(K, L, J) {
                                L.apply(H, K.concat([function() {
                                    var N = arguments[0];
                                    var M = Array.prototype.slice.call(arguments, 1);
                                    J(N, M)
                                }
                                ]))
                            }, function(K, J) {
                                I.apply(H, [K].concat(J))
                            })
                        }
                    }
                    ;
                    m.compose = function() {
                        return m.seq.apply(null, Array.prototype.reverse.call(arguments))
                    }
                    ;
                    var s = function(I, G) {
                        var H = function() {
                            var K = this;
                            var J = Array.prototype.slice.call(arguments);
                            var L = J.pop();
                            return I(G, function(N, M) {
                                N.apply(K, J.concat([M]))
                            }, L)
                        };
                        if (arguments.length > 2) {
                            var F = Array.prototype.slice.call(arguments, 2);
                            return H.apply(this, F)
                        } else {
                            return H
                        }
                    };
                    m.applyEach = z(s);
                    m.applyEachSeries = v(s);
                    m.forever = function(G, H) {
                        function F(I) {
                            if (I) {
                                if (H) {
                                    return H(I)
                                }
                                throw I
                            }
                            G(F)
                        }
                        F()
                    }
                    ;
                    if (typeof g !== "undefined" && g.exports) {
                        g.exports = m
                    } else {
                        if (typeof d !== "undefined" && d.amd) {
                            d([], function() {
                                return m
                            })
                        } else {
                            y.async = m
                        }
                    }
                }())
            }
            ).call(this, f("_process"))
        }
        , {
            _process: 4
        }],
        13: [function(f, g, e) {
            arguments[4][10][0].apply(e, arguments)
        }
        , {
            dup: 10
        }],
        14: [function(g, h, e) {
            var i = g("async")
              , f = g("url")
              , k = g("./Resource")
              , j = g("eventemitter3");
            function l(n, m) {
                j.call(this);
                m = m || 10;
                this.baseUrl = n || "";
                this.progress = 0;
                this.loading = false;
                this._progressChunk = 0;
                this._beforeMiddleware = [];
                this._afterMiddleware = [];
                this._boundLoadResource = this._loadResource.bind(this);
                this._boundOnLoad = this._onLoad.bind(this);
                this._buffer = [];
                this._numToLoad = 0;
                this._queue = i.queue(this._boundLoadResource, m);
                this.resources = {}
            }
            l.prototype = Object.create(j.prototype);
            l.prototype.constructor = l;
            h.exports = l;
            l.prototype.add = l.prototype.enqueue = function(p, o, n, m) {
                if (Array.isArray(p)) {
                    for (var q = 0; q < p.length; ++q) {
                        this.add(p[q])
                    }
                    return this
                }
                if (typeof p === "object") {
                    m = o || p.callback || p.onComplete;
                    n = p;
                    o = p.url;
                    p = p.name || p.key || p.url
                }
                if (typeof o !== "string") {
                    m = n;
                    n = o;
                    o = p
                }
                if (typeof o !== "string") {
                    throw new Error("No url passed to add resource to loader.")
                }
                if (typeof n === "function") {
                    m = n;
                    n = null
                }
                if (this.resources[p]) {
                    throw new Error('Resource with name "' + p + '" already exists.')
                }
                o = this._handleBaseUrl(o);
                this.resources[p] = new k(p,o,n);
                if (typeof m === "function") {
                    this.resources[p].once("afterMiddleware", m)
                }
                this._numToLoad++;
                if (this._queue.started) {
                    this._queue.push(this.resources[p]);
                    this._progressChunk = (100 - this.progress) / (this._queue.length() + this._queue.running())
                } else {
                    this._buffer.push(this.resources[p]);
                    this._progressChunk = 100 / this._buffer.length
                }
                return this
            }
            ;
            l.prototype._handleBaseUrl = function(m) {
                var n = f.parse(m);
                if (n.protocol || n.pathname.indexOf("//") === 0) {
                    return m
                }
                if (this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && m.lastIndexOf("/") !== m.length - 1) {
                    return this.baseUrl + "/" + m
                } else {
                    return this.baseUrl + m
                }
            }
            ;
            l.prototype.before = l.prototype.pre = function(m) {
                this._beforeMiddleware.push(m);
                return this
            }
            ;
            l.prototype.after = l.prototype.use = function(m) {
                this._afterMiddleware.push(m);
                return this
            }
            ;
            l.prototype.reset = function() {
                this.progress = 0;
                this.loading = false;
                this._progressChunk = 0;
                this._buffer.length = 0;
                this._numToLoad = 0;
                this._queue.kill();
                this._queue.started = false;
                this.resources = {}
            }
            ;
            l.prototype.load = function(m) {
                if (typeof m === "function") {
                    this.once("complete", m)
                }
                if (this._queue.started) {
                    return this
                }
                this.emit("start", this);
                for (var n = 0; n < this._buffer.length; ++n) {
                    this._queue.push(this._buffer[n])
                }
                this._buffer.length = 0;
                return this
            }
            ;
            l.prototype._loadResource = function(o, n) {
                var m = this;
                o._dequeue = n;
                this._runMiddleware(o, this._beforeMiddleware, function() {
                    o.load(m._boundOnLoad)
                })
            }
            ;
            l.prototype._onComplete = function() {
                this.emit("complete", this, this.resources)
            }
            ;
            l.prototype._onLoad = function(m) {
                this.progress += this._progressChunk;
                this.emit("progress", this, m);
                if (m.error) {
                    this.emit("error", m.error, this, m)
                } else {
                    this.emit("load", this, m)
                }
                this._runMiddleware(m, this._afterMiddleware, function() {
                    m.emit("afterMiddleware", m);
                    this._numToLoad--;
                    if (this._numToLoad === 0) {
                        this._onComplete()
                    }
                });
                m._dequeue()
            }
            ;
            l.prototype._runMiddleware = function(p, o, m) {
                var n = this;
                i.eachSeries(o, function(r, q) {
                    r.call(n, p, q)
                }, m.bind(this, p))
            }
            ;
            l.LOAD_TYPE = k.LOAD_TYPE;
            l.XHR_READY_STATE = k.XHR_READY_STATE;
            l.XHR_RESPONSE_TYPE = k.XHR_RESPONSE_TYPE
        }
        , {
            "./Resource": 15,
            async: 12,
            eventemitter3: 13,
            url: 9
        }],
        15: [function(h, i, f) {
            var k = h("eventemitter3")
              , j = !!(window.XDomainRequest && !("withCredentials"in (new XMLHttpRequest())));
            function l(o, n, m) {
                k.call(this);
                m = m || {};
                if (typeof o !== "string" || typeof n !== "string") {
                    throw new Error("Both name and url are required for constructing a resource.")
                }
                this.name = o;
                this.url = n;
                this.data = null;
                this.crossOrigin = m.crossOrigin;
                this.loadType = m.loadType || this._determineLoadType();
                this.xhrType = m.xhrType;
                this.error = null;
                this.xhr = null;
                this.isJson = false;
                this.isXml = false;
                this.isImage = false;
                this.isAudio = false;
                this.isVideo = false;
                this._dequeue = null;
                this._boundComplete = this.complete.bind(this);
                this._boundOnError = this._onError.bind(this);
                this._boundOnProgress = this._onProgress.bind(this);
                this._boundXhrOnError = this._xhrOnError.bind(this);
                this._boundXhrOnAbort = this._xhrOnAbort.bind(this);
                this._boundXhrOnLoad = this._xhrOnLoad.bind(this);
                this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)
            }
            l.prototype = Object.create(k.prototype);
            l.prototype.constructor = l;
            i.exports = l;
            l.prototype.complete = function() {
                if (this.data && this.data.removeEventListener) {
                    this.data.removeEventListener("error", this._boundOnError);
                    this.data.removeEventListener("load", this._boundComplete);
                    this.data.removeEventListener("progress", this._boundOnProgress);
                    this.data.removeEventListener("canplaythrough", this._boundComplete)
                }
                if (this.xhr) {
                    if (this.xhr.removeEventListener) {
                        this.xhr.removeEventListener("error", this._boundXhrOnError);
                        this.xhr.removeEventListener("abort", this._boundXhrOnAbort);
                        this.xhr.removeEventListener("progress", this._boundOnProgress);
                        this.xhr.removeEventListener("load", this._boundXhrOnLoad)
                    } else {
                        this.xhr.onerror = null;
                        this.xhr.ontimeout = null;
                        this.xhr.onprogress = null;
                        this.xhr.onload = null
                    }
                }
                this.emit("complete", this)
            }
            ;
            l.prototype.load = function(m) {
                this.emit("start", this);
                if (m) {
                    this.once("complete", m)
                }
                if (typeof this.crossOrigin !== "string") {
                    this.crossOrigin = this._determineCrossOrigin()
                }
                switch (this.loadType) {
                case l.LOAD_TYPE.IMAGE:
                    this._loadImage();
                    break;
                case l.LOAD_TYPE.AUDIO:
                    this._loadElement("audio");
                    break;
                case l.LOAD_TYPE.VIDEO:
                    this._loadElement("video");
                    break;
                case l.LOAD_TYPE.XHR:
                default:
                    if (j) {
                        this._loadXdr()
                    } else {
                        this._loadXhr()
                    }
                    break
                }
            }
            ;
            l.prototype._loadImage = function() {
                this.data = new Image();
                if (this.crossOrigin) {
                    this.data.crossOrigin = ""
                }
                this.data.src = this.url;
                this.isImage = true;
                this.data.addEventListener("error", this._boundOnError, false);
                this.data.addEventListener("load", this._boundComplete, false);
                this.data.addEventListener("progress", this._boundOnProgress, false)
            }
            ;
            l.prototype._loadElement = function(n) {
                this.data = document.createElement(n);
                if (Array.isArray(this.url)) {
                    for (var m = 0; m < this.url.length; ++m) {
                        this.data.appendChild(this._createSource(n, this.url[m]))
                    }
                } else {
                    this.data.appendChild(this._createSource(n, this.url))
                }
                this["is" + n[0].toUpperCase() + n.substring(1)] = true;
                this.data.addEventListener("error", this._boundOnError, false);
                this.data.addEventListener("load", this._boundComplete, false);
                this.data.addEventListener("progress", this._boundOnProgress, false);
                this.data.addEventListener("canplaythrough", this._boundComplete, false);
                this.data.load()
            }
            ;
            l.prototype._loadXhr = function() {
                if (typeof this.xhrType !== "string") {
                    this.xhrType = this._determineXhrType()
                }
                var m = this.xhr = new XMLHttpRequest();
                m.open("GET", this.url, true);
                if (this.xhrType === l.XHR_RESPONSE_TYPE.JSON || this.xhrType === l.XHR_RESPONSE_TYPE.DOCUMENT) {
                    m.responseType = l.XHR_RESPONSE_TYPE.TEXT
                } else {
                    m.responseType = this.xhrType
                }
                m.addEventListener("error", this._boundXhrOnError, false);
                m.addEventListener("abort", this._boundXhrOnAbort, false);
                m.addEventListener("progress", this._boundOnProgress, false);
                m.addEventListener("load", this._boundXhrOnLoad, false);
                m.send()
            }
            ;
            l.prototype._loadXdr = function() {
                if (typeof this.xhrType !== "string") {
                    this.xhrType = this._determineXhrType()
                }
                var m = this.xhr = new XDomainRequest();
                m.timeout = 5000;
                m.onerror = this._boundXhrOnError;
                m.ontimeout = this._boundXdrOnTimeout;
                m.onprogress = this._boundOnProgress;
                m.onload = this._boundXhrOnLoad;
                m.open("GET", this.url, true);
                setTimeout(function() {
                    m.send()
                }, 0)
            }
            ;
            l.prototype._createSource = function(n, m, p) {
                if (!p) {
                    p = n + "/" + m.substr(m.lastIndexOf(".") + 1)
                }
                var o = document.createElement("source");
                o.src = m;
                o.type = p;
                return o
            }
            ;
            l.prototype._onError = function(m) {
                this.error = new Error("Failed to load element using " + m.target.nodeName);
                this.complete()
            }
            ;
            l.prototype._onProgress = function(m) {
                if (m && m.lengthComputable) {
                    this.emit("progress", this, m.loaded / m.total)
                }
            }
            ;
            l.prototype._xhrOnError = function() {
                this.error = new Error(e(this.xhr) + " Request failed. Status: " + this.xhr.status + ', text: "' + this.xhr.statusText + '"');
                this.complete()
            }
            ;
            l.prototype._xhrOnAbort = function() {
                this.error = new Error(e(this.xhr) + " Request was aborted by the user.");
                this.complete()
            }
            ;
            l.prototype._xdrOnTimeout = function() {
                this.error = new Error(e(this.xhr) + " Request timed out.");
                this.complete()
            }
            ;
            l.prototype._xhrOnLoad = function() {
                var o = this.xhr
                  , m = o.status !== undefined ? o.status : 200;
                if (m === 200 || m === 204) {
                    if (this.xhrType === l.XHR_RESPONSE_TYPE.TEXT) {
                        this.data = o.responseText
                    } else {
                        if (this.xhrType === l.XHR_RESPONSE_TYPE.JSON) {
                            try {
                                this.data = JSON.parse(o.responseText);
                                this.isJson = true
                            } catch (n) {
                                this.error = new Error("Error trying to parse loaded json:",n)
                            }
                        } else {
                            if (this.xhrType === l.XHR_RESPONSE_TYPE.DOCUMENT) {
                                try {
                                    if (window.DOMParser) {
                                        var q = new DOMParser();
                                        this.data = q.parseFromString(o.responseText, "text/xml")
                                    } else {
                                        var p = document.createElement("div");
                                        p.innerHTML = o.responseText;
                                        this.data = p
                                    }
                                    this.isXml = true
                                } catch (n) {
                                    this.error = new Error("Error trying to parse loaded xml:",n)
                                }
                            } else {
                                this.data = o.response || o.responseText
                            }
                        }
                    }
                } else {
                    this.error = new Error("[" + o.status + "]" + o.statusText + ":" + o.responseURL)
                }
                this.complete()
            }
            ;
            function e(m) {
                return m.toString().replace("object ", "")
            }
            l.prototype._determineCrossOrigin = function() {
                if (this.url.indexOf("data:") === 0) {
                    return ""
                }
                var n = window.location
                  , m = document.createElement("a");
                m.href = this.url;
                if (m.hostname !== n.hostname || m.port !== n.port || m.protocol !== n.protocol) {
                    return "anonymous"
                }
                return ""
            }
            ;
            l.prototype._determineXhrType = function() {
                var m = this.url.substr(this.url.lastIndexOf(".") + 1);
                return l._xhrTypeMap[m] || l.XHR_RESPONSE_TYPE.TEXT
            }
            ;
            l.prototype._determineLoadType = function() {
                var m = this.url.substr(this.url.lastIndexOf(".") + 1);
                return l._loadTypeMap[m] || l.LOAD_TYPE.XHR
            }
            ;
            l.prototype._getMimeFromXhrType = function(m) {
                switch (m) {
                case l.XHR_RESPONSE_TYPE.BUFFER:
                    return "application/octet-binary";
                case l.XHR_RESPONSE_TYPE.BLOB:
                    return "application/blob";
                case l.XHR_RESPONSE_TYPE.DOCUMENT:
                    return "application/xml";
                case l.XHR_RESPONSE_TYPE.JSON:
                    return "application/json";
                case l.XHR_RESPONSE_TYPE.DEFAULT:
                case l.XHR_RESPONSE_TYPE.TEXT:
                default:
                    return "text/plain"
                }
            }
            ;
            l.LOAD_TYPE = {
                XHR: 1,
                IMAGE: 2,
                AUDIO: 3,
                VIDEO: 4
            };
            l.XHR_READY_STATE = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            };
            l.XHR_RESPONSE_TYPE = {
                DEFAULT: "text",
                BUFFER: "arraybuffer",
                BLOB: "blob",
                DOCUMENT: "document",
                JSON: "json",
                TEXT: "text"
            };
            l._loadTypeMap = {
                gif: l.LOAD_TYPE.IMAGE,
                png: l.LOAD_TYPE.IMAGE,
                bmp: l.LOAD_TYPE.IMAGE,
                jpg: l.LOAD_TYPE.IMAGE,
                jpeg: l.LOAD_TYPE.IMAGE,
                tif: l.LOAD_TYPE.IMAGE,
                tiff: l.LOAD_TYPE.IMAGE,
                webp: l.LOAD_TYPE.IMAGE
            };
            l._xhrTypeMap = {
                xhtml: l.XHR_RESPONSE_TYPE.DOCUMENT,
                html: l.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: l.XHR_RESPONSE_TYPE.DOCUMENT,
                xml: l.XHR_RESPONSE_TYPE.DOCUMENT,
                tmx: l.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: l.XHR_RESPONSE_TYPE.DOCUMENT,
                svg: l.XHR_RESPONSE_TYPE.DOCUMENT,
                gif: l.XHR_RESPONSE_TYPE.BLOB,
                png: l.XHR_RESPONSE_TYPE.BLOB,
                bmp: l.XHR_RESPONSE_TYPE.BLOB,
                jpg: l.XHR_RESPONSE_TYPE.BLOB,
                jpeg: l.XHR_RESPONSE_TYPE.BLOB,
                tif: l.XHR_RESPONSE_TYPE.BLOB,
                tiff: l.XHR_RESPONSE_TYPE.BLOB,
                webp: l.XHR_RESPONSE_TYPE.BLOB,
                json: l.XHR_RESPONSE_TYPE.JSON,
                text: l.XHR_RESPONSE_TYPE.TEXT,
                txt: l.XHR_RESPONSE_TYPE.TEXT
            };
            l.setExtensionLoadType = function(n, m) {
                g(l._loadTypeMap, n, m)
            }
            ;
            l.setExtensionXhrType = function(n, m) {
                g(l._xhrTypeMap, n, m)
            }
            ;
            function g(m, o, n) {
                if (o && o.indexOf(".") === 0) {
                    o = o.substring(1)
                }
                if (!o) {
                    return
                }
                m[o] = n
            }
        }
        , {
            eventemitter3: 13
        }],
        16: [function(f, g, e) {
            g.exports = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encodeBinary: function(j) {
                    var i = "";
                    var n;
                    var h = new Array(4);
                    var m = 0;
                    var k = 0;
                    var l = 0;
                    while (m < j.length) {
                        n = new Array(3);
                        for (k = 0; k < n.length; k++) {
                            if (m < j.length) {
                                n[k] = j.charCodeAt(m++) & 255
                            } else {
                                n[k] = 0
                            }
                        }
                        h[0] = n[0] >> 2;
                        h[1] = ((n[0] & 3) << 4) | (n[1] >> 4);
                        h[2] = ((n[1] & 15) << 2) | (n[2] >> 6);
                        h[3] = n[2] & 63;
                        l = m - (j.length - 1);
                        switch (l) {
                        case 2:
                            h[3] = 64;
                            h[2] = 64;
                            break;
                        case 1:
                            h[3] = 64;
                            break;
                        default:
                            break
                        }
                        for (k = 0; k < h.length; k++) {
                            i += this._keyStr.charAt(h[k])
                        }
                    }
                    return i
                }
            }
        }
        , {}],
        17: [function(f, g, e) {
            g.exports = f("./Loader");
            g.exports.Resource = f("./Resource");
            g.exports.middleware = {
                caching: {
                    memory: f("./middlewares/caching/memory")
                },
                parsing: {
                    blob: f("./middlewares/parsing/blob")
                }
            }
        }
        , {
            "./Loader": 14,
            "./Resource": 15,
            "./middlewares/caching/memory": 18,
            "./middlewares/parsing/blob": 19
        }],
        18: [function(g, h, f) {
            var e = {};
            h.exports = function() {
                return function(j, i) {
                    if (e[j.url]) {
                        j.data = e[j.url];
                        j.complete()
                    } else {
                        j.once("complete", function() {
                            e[this.url] = this.data
                        });
                        i()
                    }
                }
            }
        }
        , {}],
        19: [function(f, h, e) {
            var i = f("../../Resource")
              , g = f("../../b64");
            window.URL = window.URL || window.webkitURL;
            h.exports = function() {
                return function(l, k) {
                    if (!l.data) {
                        return k()
                    }
                    if (l.xhr && l.xhrType === i.XHR_RESPONSE_TYPE.BLOB) {
                        if (!window.Blob || typeof l.data === "string") {
                            var j = l.xhr.getResponseHeader("content-type");
                            if (j && j.indexOf("image") === 0) {
                                l.data = new Image();
                                l.data.src = "data:" + j + ";base64," + g.encodeBinary(l.xhr.responseText);
                                l.isImage = true;
                                l.data.onload = function() {
                                    l.data.onload = null;
                                    k()
                                }
                            }
                        } else {
                            if (l.data.type.indexOf("image") === 0) {
                                var m = URL.createObjectURL(l.data);
                                l.blob = l.data;
                                l.data = new Image();
                                l.data.src = m;
                                l.isImage = true;
                                l.data.onload = function() {
                                    URL.revokeObjectURL(m);
                                    l.data.onload = null;
                                    k()
                                }
                            }
                        }
                    } else {
                        k()
                    }
                }
            }
        }
        , {
            "../../Resource": 15,
            "../../b64": 16
        }],
        20: [function(f, g, e) {
            g.exports = {
                name: "pixi.js",
                version: "3.0.2",
                description: "Pixi.js is a fast lightweight 2D library that works across all devices.",
                author: "Mat Groves",
                contributors: ["Chad Engler <chad@pantherdev.com>", "Richard Davey <rdavey@gmail.com>"],
                main: "./src/index.js",
                homepage: "http://goodboydigital.com/",
                bugs: "https://github.com/GoodBoyDigital/pixi.js/issues",
                license: "MIT",
                repository: {
                    type: "git",
                    url: "https://github.com/GoodBoyDigital/pixi.js.git"
                },
                scripts: {
                    test: "gulp && testem ci",
                    docs: "jsdoc -c ./gulp/util/jsdoc.conf.json -R README.md"
                },
                dependencies: {
                    async: "^0.9.0",
                    brfs: "^1.4.0",
                    eventemitter3: "^1.0.1",
                    "object-assign": "^2.0.0",
                    "resource-loader": "^1.5.2"
                },
                devDependencies: {
                    browserify: "^9.0.8",
                    chai: "^2.2.0",
                    del: "^1.1.1",
                    gulp: "^3.8.11",
                    "gulp-cached": "^1.0.4",
                    "gulp-concat": "^2.5.2",
                    "gulp-debug": "^2.0.1",
                    "gulp-jshint": "^1.10.0",
                    "gulp-mirror": "^0.4.0",
                    "gulp-plumber": "^1.0.0",
                    "gulp-rename": "^1.2.2",
                    "gulp-sourcemaps": "^1.5.2",
                    "gulp-uglify": "^1.2.0",
                    "gulp-util": "^3.0.4",
                    "ink-docstrap": "git+https://github.com/Pilatch/docstrap.git",
                    jsdoc: "^3.3.0-beta3",
                    "jshint-summary": "^0.4.0",
                    minimist: "^1.1.1",
                    mocha: "^2.2.4",
                    "require-dir": "^0.3.0",
                    "run-sequence": "^1.0.2",
                    testem: "^0.8.2",
                    "vinyl-buffer": "^1.0.0",
                    "vinyl-source-stream": "^1.1.0",
                    watchify: "^3.1.2"
                },
                browserify: {
                    transform: ["brfs"]
                }
            }
        }
        , {}],
        21: [function(f, g, e) {
            g.exports = {
                VERSION: f("../../package.json").version,
                PI_2: Math.PI * 2,
                RAD_TO_DEG: 180 / Math.PI,
                DEG_TO_RAD: Math.PI / 180,
                TARGET_FPMS: 0.06,
                RENDERER_TYPE: {
                    UNKNOWN: 0,
                    WEBGL: 1,
                    CANVAS: 2
                },
                BLEND_MODES: {
                    NORMAL: 0,
                    ADD: 1,
                    MULTIPLY: 2,
                    SCREEN: 3,
                    OVERLAY: 4,
                    DARKEN: 5,
                    LIGHTEN: 6,
                    COLOR_DODGE: 7,
                    COLOR_BURN: 8,
                    HARD_LIGHT: 9,
                    SOFT_LIGHT: 10,
                    DIFFERENCE: 11,
                    EXCLUSION: 12,
                    HUE: 13,
                    SATURATION: 14,
                    COLOR: 15,
                    LUMINOSITY: 16
                },
                SCALE_MODES: {
                    DEFAULT: 0,
                    LINEAR: 0,
                    NEAREST: 1
                },
                RETINA_PREFIX: /@(.+)x/,
                RESOLUTION: 1,
                FILTER_RESOLUTION: 1,
                DEFAULT_RENDER_OPTIONS: {
                    view: null,
                    resolution: 1,
                    antialias: false,
                    forceFXAA: false,
                    autoResize: false,
                    transparent: false,
                    backgroundColor: 0,
                    clearBeforeRender: true,
                    preserveDrawingBuffer: false
                },
                SHAPES: {
                    POLY: 0,
                    RECT: 1,
                    CIRC: 2,
                    ELIP: 3,
                    RREC: 4
                },
                SPRITE_BATCH_SIZE: 2000
            }
        }
        , {
            "../../package.json": 20
        }],
        22: [function(i, j, h) {
            var k = i("../math")
              , g = i("./DisplayObject")
              , l = i("../textures/RenderTexture")
              , f = new k.Matrix();
            function e() {
                g.call(this);
                this.children = []
            }
            e.prototype = Object.create(g.prototype);
            e.prototype.constructor = e;
            j.exports = e;
            Object.defineProperties(e.prototype, {
                width: {
                    get: function() {
                        return this.scale.x * this.getLocalBounds().width
                    },
                    set: function(n) {
                        var m = this.getLocalBounds().width;
                        if (m !== 0) {
                            this.scale.x = n / m
                        } else {
                            this.scale.x = 1
                        }
                        this._width = n
                    }
                },
                height: {
                    get: function() {
                        return this.scale.y * this.getLocalBounds().height
                    },
                    set: function(n) {
                        var m = this.getLocalBounds().height;
                        if (m !== 0) {
                            this.scale.y = n / m
                        } else {
                            this.scale.y = 1
                        }
                        this._height = n
                    }
                }
            });
            e.prototype.addChild = function(m) {
                return this.addChildAt(m, this.children.length)
            }
            ;
            e.prototype.addChildAt = function(n, m) {
                if (n === this) {
                    return n
                }
                if (m >= 0 && m <= this.children.length) {
                    if (n.parent) {
                        n.parent.removeChild(n)
                    }
                    n.parent = this;
                    this.children.splice(m, 0, n);
                    return n
                } else {
                    throw new Error(n + "addChildAt: The index " + m + " supplied is out of bounds " + this.children.length)
                }
            }
            ;
            e.prototype.swapChildren = function(p, m) {
                if (p === m) {
                    return
                }
                var o = this.getChildIndex(p);
                var n = this.getChildIndex(m);
                if (o < 0 || n < 0) {
                    throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.")
                }
                this.children[o] = m;
                this.children[n] = p
            }
            ;
            e.prototype.getChildIndex = function(n) {
                var m = this.children.indexOf(n);
                if (m === -1) {
                    throw new Error("The supplied DisplayObject must be a child of the caller")
                }
                return m
            }
            ;
            e.prototype.setChildIndex = function(o, n) {
                if (n < 0 || n >= this.children.length) {
                    throw new Error("The supplied index is out of bounds")
                }
                var m = this.getChildIndex(o);
                this.children.splice(m, 1);
                this.children.splice(n, 0, o)
            }
            ;
            e.prototype.getChildAt = function(m) {
                if (m < 0 || m >= this.children.length) {
                    throw new Error("getChildAt: Supplied index " + m + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller")
                }
                return this.children[m]
            }
            ;
            e.prototype.removeChild = function(n) {
                var m = this.children.indexOf(n);
                if (m === -1) {
                    return
                }
                return this.removeChildAt(m)
            }
            ;
            e.prototype.removeChildAt = function(m) {
                var n = this.getChildAt(m);
                n.parent = null;
                this.children.splice(m, 1);
                return n
            }
            ;
            e.prototype.removeChildren = function(q, r) {
                var p = q || 0;
                var m = typeof r === "number" ? r : this.children.length;
                var n = m - p;
                if (n > 0 && n <= m) {
                    var s = this.children.splice(p, n);
                    for (var o = 0; o < s.length; ++o) {
                        s[o].parent = null
                    }
                    return s
                } else {
                    if (n === 0 && this.children.length === 0) {
                        return []
                    } else {
                        throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
                    }
                }
            }
            ;
            e.prototype.generateTexture = function(q, n, o) {
                var p = this.getLocalBounds();
                var m = new l(q,p.width | 0,p.height | 0,q,o,n);
                f.tx = -p.x;
                f.ty = -p.y;
                m.render(this, f);
                return m
            }
            ;
            e.prototype.updateTransform = function() {
                if (!this.visible) {
                    return
                }
                this.displayObjectUpdateTransform();
                for (var n = 0, m = this.children.length; n < m; ++n) {
                    this.children[n].updateTransform()
                }
            }
            ;
            e.prototype.containerUpdateTransform = e.prototype.updateTransform;
            e.prototype.getBounds = function() {
                if (!this._currentBounds) {
                    if (this.children.length === 0) {
                        return k.Rectangle.EMPTY
                    }
                    var s = Infinity;
                    var r = Infinity;
                    var o = -Infinity;
                    var n = -Infinity;
                    var t;
                    var x;
                    var w;
                    var p = false;
                    for (var v = 0, u = this.children.length; v < u; ++v) {
                        var q = this.children[v];
                        if (!q.visible) {
                            continue
                        }
                        p = true;
                        t = this.children[v].getBounds();
                        s = s < t.x ? s : t.x;
                        r = r < t.y ? r : t.y;
                        x = t.width + t.x;
                        w = t.height + t.y;
                        o = o > x ? o : x;
                        n = n > w ? n : w
                    }
                    if (!p) {
                        return k.Rectangle.EMPTY
                    }
                    var m = this._bounds;
                    m.x = s;
                    m.y = r;
                    m.width = o - s;
                    m.height = n - r;
                    this._currentBounds = m
                }
                return this._currentBounds
            }
            ;
            e.prototype.containerGetBounds = e.prototype.getBounds;
            e.prototype.getLocalBounds = function() {
                var m = this.worldTransform;
                this.worldTransform = k.Matrix.IDENTITY;
                for (var o = 0, n = this.children.length; o < n; ++o) {
                    this.children[o].updateTransform()
                }
                this.worldTransform = m;
                this._currentBounds = null;
                return this.getBounds(k.Matrix.IDENTITY)
            }
            ;
            e.prototype.renderWebGL = function(o) {
                if (!this.visible || this.worldAlpha <= 0 || !this.renderable) {
                    return
                }
                var n, m;
                if (this._mask || this._filters) {
                    o.currentRenderer.flush();
                    if (this._filters) {
                        o.filterManager.pushFilter(this, this._filters)
                    }
                    if (this._mask) {
                        o.maskManager.pushMask(this, this._mask)
                    }
                    o.currentRenderer.start();
                    this._renderWebGL(o);
                    for (n = 0,
                    m = this.children.length; n < m; n++) {
                        this.children[n].renderWebGL(o)
                    }
                    o.currentRenderer.flush();
                    if (this._mask) {
                        o.maskManager.popMask(this, this._mask)
                    }
                    if (this._filters) {
                        o.filterManager.popFilter()
                    }
                    o.currentRenderer.start()
                } else {
                    this._renderWebGL(o);
                    for (n = 0,
                    m = this.children.length; n < m; ++n) {
                        this.children[n].renderWebGL(o)
                    }
                }
            }
            ;
            e.prototype._renderWebGL = function(m) {}
            ;
            e.prototype._renderCanvas = function(m) {}
            ;
            e.prototype.renderCanvas = function(o) {
                if (!this.visible || this.alpha <= 0 || !this.renderable) {
                    return
                }
                if (this._mask) {
                    o.maskManager.pushMask(this._mask, o)
                }
                this._renderCanvas(o);
                for (var n = 0, m = this.children.length; n < m; ++n) {
                    this.children[n].renderCanvas(o)
                }
                if (this._mask) {
                    o.maskManager.popMask(o)
                }
            }
            ;
            e.prototype.destroy = function(o) {
                g.prototype.destroy.call(this);
                if (o) {
                    for (var n = 0, m = this.children.length; n < m; ++n) {
                        this.children[n].destroy(o)
                    }
                }
                this.removeChildren();
                this.children = null
            }
        }
        , {
            "../math": 31,
            "../textures/RenderTexture": 69,
            "./DisplayObject": 23
        }],
        23: [function(f, e, g) {
            var k = f("../math")
              , i = f("../textures/RenderTexture")
              , l = f("eventemitter3")
              , m = f("../const")
              , j = new k.Matrix();
            function h() {
                l.call(this);
                this.position = new k.Point();
                this.scale = new k.Point(1,1);
                this.pivot = new k.Point(0,0);
                this.rotation = 0;
                this.alpha = 1;
                this.visible = true;
                this.renderable = true;
                this.parent = null;
                this.worldAlpha = 1;
                this.worldTransform = new k.Matrix();
                this.filterArea = null;
                this._sr = 0;
                this._cr = 1;
                this._bounds = new k.Rectangle(0,0,1,1);
                this._currentBounds = null;
                this._mask = null;
                this._cacheAsBitmap = false;
                this._cachedObject = null
            }
            h.prototype = Object.create(l.prototype);
            h.prototype.constructor = h;
            e.exports = h;
            Object.defineProperties(h.prototype, {
                x: {
                    get: function() {
                        return this.position.x
                    },
                    set: function(n) {
                        this.position.x = n
                    }
                },
                y: {
                    get: function() {
                        return this.position.y
                    },
                    set: function(n) {
                        this.position.y = n
                    }
                },
                worldVisible: {
                    get: function() {
                        var n = this;
                        do {
                            if (!n.visible) {
                                return false
                            }
                            n = n.parent
                        } while (n);
                        return true
                    }
                },
                mask: {
                    get: function() {
                        return this._mask
                    },
                    set: function(n) {
                        if (this._mask) {
                            this._mask.renderable = true
                        }
                        this._mask = n;
                        if (this._mask) {
                            this._mask.renderable = false
                        }
                    }
                },
                filters: {
                    get: function() {
                        return this._filters && this._filters.slice()
                    },
                    set: function(n) {
                        this._filters = n && n.slice()
                    }
                }
            });
            h.prototype.updateTransform = function() {
                var s = this.parent.worldTransform;
                var p = this.worldTransform;
                var r, o, u, t, q, n;
                if (this.rotation % m.PI_2) {
                    if (this.rotation !== this.rotationCache) {
                        this.rotationCache = this.rotation;
                        this._sr = Math.sin(this.rotation);
                        this._cr = Math.cos(this.rotation)
                    }
                    r = this._cr * this.scale.x;
                    o = this._sr * this.scale.x;
                    u = -this._sr * this.scale.y;
                    t = this._cr * this.scale.y;
                    q = this.position.x;
                    n = this.position.y;
                    if (this.pivot.x || this.pivot.y) {
                        q -= this.pivot.x * r + this.pivot.y * u;
                        n -= this.pivot.x * o + this.pivot.y * t
                    }
                    p.a = r * s.a + o * s.c;
                    p.b = r * s.b + o * s.d;
                    p.c = u * s.a + t * s.c;
                    p.d = u * s.b + t * s.d;
                    p.tx = q * s.a + n * s.c + s.tx;
                    p.ty = q * s.b + n * s.d + s.ty
                } else {
                    r = this.scale.x;
                    t = this.scale.y;
                    q = this.position.x - this.pivot.x * r;
                    n = this.position.y - this.pivot.y * t;
                    p.a = r * s.a;
                    p.b = r * s.b;
                    p.c = t * s.c;
                    p.d = t * s.d;
                    p.tx = q * s.a + n * s.c + s.tx;
                    p.ty = q * s.b + n * s.d + s.ty
                }
                this.worldAlpha = this.alpha * this.parent.worldAlpha;
                this._currentBounds = null
            }
            ;
            h.prototype.displayObjectUpdateTransform = h.prototype.updateTransform;
            h.prototype.getBounds = function(n) {
                return k.Rectangle.EMPTY
            }
            ;
            h.prototype.getLocalBounds = function() {
                return this.getBounds(k.Matrix.IDENTITY)
            }
            ;
            h.prototype.toGlobal = function(n) {
                this.displayObjectUpdateTransform();
                return this.worldTransform.apply(n)
            }
            ;
            h.prototype.toLocal = function(n, o) {
                if (o) {
                    n = o.toGlobal(n)
                }
                this.displayObjectUpdateTransform();
                return this.worldTransform.applyInverse(n)
            }
            ;
            h.prototype.renderWebGL = function(n) {}
            ;
            h.prototype.renderCanvas = function(n) {}
            ;
            h.prototype.generateTexture = function(r, o, p) {
                var q = this.getLocalBounds();
                var n = new i(r,q.width | 0,q.height | 0,r,p,o);
                j.tx = -q.x;
                j.ty = -q.y;
                n.render(this, j);
                return n
            }
            ;
            h.prototype.destroy = function() {
                this.position = null;
                this.scale = null;
                this.pivot = null;
                this.parent = null;
                this._bounds = null;
                this._currentBounds = null;
                this._mask = null;
                this.worldTransform = null;
                this.filterArea = null
            }
        }
        , {
            "../const": 21,
            "../math": 31,
            "../textures/RenderTexture": 69,
            eventemitter3: 10
        }],
        24: [function(h, g, k) {
            var i = h("../display/Container")
              , f = h("../sprites/Sprite")
              , j = h("../textures/Texture")
              , m = h("../renderers/canvas/utils/CanvasBuffer")
              , p = h("../renderers/canvas/utils/CanvasGraphics")
              , n = h("./GraphicsData")
              , o = h("../math")
              , q = h("../const")
              , e = new o.Point();
            function l() {
                i.call(this);
                this.fillAlpha = 1;
                this.lineWidth = 0;
                this.lineColor = 0;
                this.graphicsData = [];
                this.tint = 16777215;
                this._prevTint = 16777215;
                this.blendMode = q.BLEND_MODES.NORMAL;
                this.currentPath = null;
                this._webGL = {};
                this.isMask = false;
                this.boundsPadding = 0;
                this._localBounds = new o.Rectangle(0,0,1,1);
                this.dirty = true;
                this.glDirty = false;
                this.boundsDirty = true;
                this.cachedSpriteDirty = false
            }
            l.prototype = Object.create(i.prototype);
            l.prototype.constructor = l;
            g.exports = l;
            Object.defineProperties(l.prototype, {});
            l.prototype.clone = function() {
                var s = new l();
                s.renderable = this.renderable;
                s.fillAlpha = this.fillAlpha;
                s.lineWidth = this.lineWidth;
                s.lineColor = this.lineColor;
                s.tint = this.tint;
                s.blendMode = this.blendMode;
                s.isMask = this.isMask;
                s.boundsPadding = this.boundsPadding;
                s.dirty = this.dirty;
                s.glDirty = this.glDirty;
                s.cachedSpriteDirty = this.cachedSpriteDirty;
                for (var r = 0; r < this.graphicsData.length; ++r) {
                    s.graphicsData.push(this.graphicsData[r].clone())
                }
                s.currentPath = s.graphicsData[s.graphicsData.length - 1];
                s.updateLocalBounds();
                return s
            }
            ;
            l.prototype.lineStyle = function(r, s, t) {
                this.lineWidth = r || 0;
                this.lineColor = s || 0;
                this.lineAlpha = (t === undefined) ? 1 : t;
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length) {
                        this.drawShape(new o.Polygon(this.currentPath.shape.points.slice(-2)))
                    } else {
                        this.currentPath.lineWidth = this.lineWidth;
                        this.currentPath.lineColor = this.lineColor;
                        this.currentPath.lineAlpha = this.lineAlpha
                    }
                }
                return this
            }
            ;
            l.prototype.moveTo = function(r, s) {
                this.drawShape(new o.Polygon([r, s]));
                return this
            }
            ;
            l.prototype.lineTo = function(r, s) {
                this.currentPath.shape.points.push(r, s);
                this.dirty = true;
                return this
            }
            ;
            l.prototype.quadraticCurveTo = function(z, v, B, y) {
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length === 0) {
                        this.currentPath.shape.points = [0, 0]
                    }
                } else {
                    this.moveTo(0, 0)
                }
                var r, w, s = 20, C = this.currentPath.shape.points;
                if (C.length === 0) {
                    this.moveTo(0, 0)
                }
                var A = C[C.length - 2];
                var x = C[C.length - 1];
                var t = 0;
                for (var u = 1; u <= s; ++u) {
                    t = u / s;
                    r = A + ((z - A) * t);
                    w = x + ((v - x) * t);
                    C.push(r + (((z + ((B - z) * t)) - r) * t), w + (((v + ((y - v) * t)) - w) * t))
                }
                this.dirty = this.boundsDirty = true;
                return this
            }
            ;
            l.prototype.bezierCurveTo = function(E, A, D, w, G, C) {
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length === 0) {
                        this.currentPath.shape.points = [0, 0]
                    }
                } else {
                    this.moveTo(0, 0)
                }
                var u = 20, s, t, r, z, y, H = this.currentPath.shape.points;
                var F = H[H.length - 2];
                var B = H[H.length - 1];
                var v = 0;
                for (var x = 1; x <= u; ++x) {
                    v = x / u;
                    s = (1 - v);
                    t = s * s;
                    r = t * s;
                    z = v * v;
                    y = z * v;
                    H.push(r * F + 3 * t * v * E + 3 * s * z * D + y * G, r * B + 3 * t * v * A + 3 * s * z * w + y * C)
                }
                this.dirty = this.boundsDirty = true;
                return this
            }
            ;
            l.prototype.arcTo = function(N, x, M, v, y) {
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length === 0) {
                        this.currentPath.shape.points.push(N, x)
                    }
                } else {
                    this.moveTo(N, x)
                }
                var K = this.currentPath.shape.points
                  , F = K[K.length - 2]
                  , D = K[K.length - 1]
                  , S = D - x
                  , A = F - N
                  , R = v - x
                  , z = M - N
                  , L = Math.abs(S * z - A * R);
                if (L < 1e-8 || y === 0) {
                    if (K[K.length - 2] !== N || K[K.length - 1] !== x) {
                        K.push(N, x)
                    }
                } else {
                    var Q = S * S + A * A
                      , H = R * R + z * z
                      , s = S * R + A * z
                      , C = y * Math.sqrt(Q) / L
                      , B = y * Math.sqrt(H) / L
                      , t = C * s / Q
                      , r = B * s / H
                      , w = C * z + B * A
                      , u = C * R + B * S
                      , G = A * (B + t)
                      , E = S * (B + t)
                      , P = z * (C + r)
                      , O = R * (C + r)
                      , J = Math.atan2(E - u, G - w)
                      , I = Math.atan2(O - u, P - w);
                    this.arc(w + N, u + x, y, J, I, A * R > z * S)
                }
                this.dirty = this.boundsDirty = true;
                return this
            }
            ;
            l.prototype.arc = function(u, t, v, F, D, r) {
                r = r || false;
                if (F === D) {
                    return this
                }
                if (!r && D <= F) {
                    D += Math.PI * 2
                } else {
                    if (r && F <= D) {
                        F += Math.PI * 2
                    }
                }
                var z = r ? (F - D) * -1 : (D - F);
                var C = Math.ceil(Math.abs(z) / (Math.PI * 2)) * 40;
                if (z === 0) {
                    return this
                }
                var L = u + Math.cos(F) * v;
                var J = t + Math.sin(F) * v;
                if (this.currentPath) {
                    if (r && this.filling) {
                        this.currentPath.shape.points.push(u, t)
                    } else {
                        this.currentPath.shape.points.push(L, J)
                    }
                } else {
                    if (r && this.filling) {
                        this.moveTo(u, t)
                    } else {
                        this.moveTo(L, J)
                    }
                }
                var I = this.currentPath.shape.points;
                var w = z / (C * 2);
                var B = w * 2;
                var E = Math.cos(w);
                var G = Math.sin(w);
                var N = C - 1;
                var x = (N % 1) / N;
                for (var H = 0; H <= N; H++) {
                    var A = H + x * H;
                    var K = ((w) + F + (B * A));
                    var M = Math.cos(K);
                    var y = -Math.sin(K);
                    I.push(((E * M) + (G * y)) * v + u, ((E * -y) + (G * M)) * v + t)
                }
                this.dirty = this.boundsDirty = true;
                return this
            }
            ;
            l.prototype.beginFill = function(r, s) {
                this.filling = true;
                this.fillColor = r || 0;
                this.fillAlpha = (s === undefined) ? 1 : s;
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length <= 2) {
                        this.currentPath.fill = this.filling;
                        this.currentPath.fillColor = this.fillColor;
                        this.currentPath.fillAlpha = this.fillAlpha
                    }
                }
                return this
            }
            ;
            l.prototype.endFill = function() {
                this.filling = false;
                this.fillColor = null;
                this.fillAlpha = 1;
                return this
            }
            ;
            l.prototype.drawRect = function(s, u, t, r) {
                this.drawShape(new o.Rectangle(s,u,t,r));
                return this
            }
            ;
            l.prototype.drawRoundedRect = function(t, v, u, s, r) {
                this.drawShape(new o.RoundedRectangle(t,v,u,s,r));
                return this
            }
            ;
            l.prototype.drawCircle = function(s, t, r) {
                this.drawShape(new o.Circle(s,t,r));
                return this
            }
            ;
            l.prototype.drawEllipse = function(s, u, t, r) {
                this.drawShape(new o.Ellipse(s,u,t,r));
                return this
            }
            ;
            l.prototype.drawPolygon = function(t) {
                var s = t;
                if (!Array.isArray(s)) {
                    s = new Array(arguments.length);
                    for (var r = 0; r < s.length; ++r) {
                        s[r] = arguments[r]
                    }
                }
                this.drawShape(new o.Polygon(s));
                return this
            }
            ;
            l.prototype.clear = function() {
                this.lineWidth = 0;
                this.filling = false;
                this.dirty = true;
                this.clearDirty = true;
                this.graphicsData = [];
                return this
            }
            ;
            l.prototype.generateTexture = function(w, r, t) {
                r = r || 1;
                var v = this.getLocalBounds();
                var s = new m(v.width * r,v.height * r);
                var u = j.fromCanvas(s.canvas, t);
                u.baseTexture.resolution = r;
                s.context.scale(r, r);
                s.context.translate(-v.x, -v.y);
                p.renderGraphics(this, s.context);
                return u
            }
            ;
            l.prototype._renderWebGL = function(r) {
                if (this.glDirty) {
                    this.dirty = true;
                    this.glDirty = false
                }
                r.setObjectRenderer(r.plugins.graphics);
                r.plugins.graphics.render(this)
            }
            ;
            l.prototype._renderCanvas = function(u) {
                if (this.isMask === true) {
                    return
                }
                if (this._prevTint !== this.tint) {
                    this.dirty = true;
                    this._prevTint = this.tint
                }
                if (this._cacheAsBitmap) {
                    if (this.dirty || this.cachedSpriteDirty) {
                        this._generateCachedSprite();
                        this.updateCachedSpriteTexture();
                        this.cachedSpriteDirty = false;
                        this.dirty = false
                    }
                    this._cachedSprite.alpha = this.alpha;
                    f.prototype._renderCanvas.call(this._cachedSprite, u);
                    return
                } else {
                    var t = u.context;
                    var s = this.worldTransform;
                    if (this.blendMode !== u.currentBlendMode) {
                        u.currentBlendMode = this.blendMode;
                        t.globalCompositeOperation = u.blendModes[u.currentBlendMode]
                    }
                    var r = u.resolution;
                    t.setTransform(s.a * r, s.b * r, s.c * r, s.d * r, s.tx * r, s.ty * r);
                    p.renderGraphics(this, t)
                }
            }
            ;
            l.prototype.getBounds = function(C) {
                if (!this._currentBounds) {
                    if (!this.renderable) {
                        return o.Rectangle.EMPTY
                    }
                    if (this.boundsDirty) {
                        this.updateLocalBounds();
                        this.glDirty = true;
                        this.cachedSpriteDirty = true;
                        this.boundsDirty = false
                    }
                    var v = this._localBounds;
                    var z = v.x;
                    var y = v.width + v.x;
                    var x = v.y;
                    var w = v.height + v.y;
                    var A = C || this.worldTransform;
                    var O = A.a;
                    var M = A.b;
                    var L = A.c;
                    var J = A.d;
                    var P = A.tx;
                    var N = A.ty;
                    var F = O * y + L * w + P;
                    var u = J * w + M * y + N;
                    var E = O * z + L * w + P;
                    var t = J * w + M * z + N;
                    var D = O * z + L * x + P;
                    var s = J * x + M * z + N;
                    var B = O * y + L * x + P;
                    var r = J * x + M * y + N;
                    var I = F;
                    var G = u;
                    var K = F;
                    var H = u;
                    K = E < K ? E : K;
                    K = D < K ? D : K;
                    K = B < K ? B : K;
                    H = t < H ? t : H;
                    H = s < H ? s : H;
                    H = r < H ? r : H;
                    I = E > I ? E : I;
                    I = D > I ? D : I;
                    I = B > I ? B : I;
                    G = t > G ? t : G;
                    G = s > G ? s : G;
                    G = r > G ? r : G;
                    this._bounds.x = K;
                    this._bounds.width = I - K;
                    this._bounds.y = H;
                    this._bounds.height = G - H;
                    this._currentBounds = this._bounds
                }
                return this._currentBounds
            }
            ;
            l.prototype.containsPoint = function(r) {
                this.worldTransform.applyInverse(r, e);
                var u = this.graphicsData;
                for (var s = 0; s < u.length; s++) {
                    var t = u[s];
                    if (!t.fill) {
                        continue
                    }
                    if (t.shape) {
                        if (t.shape.contains(e.x, e.y)) {
                            return true
                        }
                    }
                }
                return false
            }
            ;
            l.prototype.updateLocalBounds = function() {
                var u = Infinity;
                var s = -Infinity;
                var t = Infinity;
                var r = -Infinity;
                if (this.graphicsData.length) {
                    var D, J, H, F, I, B;
                    for (var A = 0; A < this.graphicsData.length; A++) {
                        var z = this.graphicsData[A];
                        var E = z.type;
                        var C = z.lineWidth;
                        D = z.shape;
                        if (E === q.SHAPES.RECT || E === q.SHAPES.RREC) {
                            H = D.x - C / 2;
                            F = D.y - C / 2;
                            I = D.width + C;
                            B = D.height + C;
                            u = H < u ? H : u;
                            s = H + I > s ? H + I : s;
                            t = F < t ? F : t;
                            r = F + B > r ? F + B : r
                        } else {
                            if (E === q.SHAPES.CIRC) {
                                H = D.x;
                                F = D.y;
                                I = D.radius + C / 2;
                                B = D.radius + C / 2;
                                u = H - I < u ? H - I : u;
                                s = H + I > s ? H + I : s;
                                t = F - B < t ? F - B : t;
                                r = F + B > r ? F + B : r
                            } else {
                                if (E === q.SHAPES.ELIP) {
                                    H = D.x;
                                    F = D.y;
                                    I = D.width + C / 2;
                                    B = D.height + C / 2;
                                    u = H - I < u ? H - I : u;
                                    s = H + I > s ? H + I : s;
                                    t = F - B < t ? F - B : t;
                                    r = F + B > r ? F + B : r
                                } else {
                                    J = D.points;
                                    for (var v = 0; v < J.length; v += 2) {
                                        H = J[v];
                                        F = J[v + 1];
                                        u = H - C < u ? H - C : u;
                                        s = H + C > s ? H + C : s;
                                        t = F - C < t ? F - C : t;
                                        r = F + C > r ? F + C : r
                                    }
                                }
                            }
                        }
                    }
                } else {
                    u = 0;
                    s = 0;
                    t = 0;
                    r = 0
                }
                var G = this.boundsPadding;
                this._localBounds.x = u - G;
                this._localBounds.width = (s - u) + G * 2;
                this._localBounds.y = t - G;
                this._localBounds.height = (r - t) + G * 2
            }
            ;
            l.prototype.drawShape = function(r) {
                if (this.currentPath) {
                    if (this.currentPath.shape.points.length <= 2) {
                        this.graphicsData.pop()
                    }
                }
                this.currentPath = null;
                var s = new n(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,r);
                this.graphicsData.push(s);
                if (s.type === q.SHAPES.POLY) {
                    s.shape.closed = this.filling;
                    this.currentPath = s
                }
                this.dirty = this.boundsDirty = true;
                return s
            }
            ;
            l.prototype.destroy = function() {
                i.prototype.destroy.apply(this, arguments);
                for (var s = 0; s < this.graphicsData.length; ++s) {
                    this.graphicsData[s].destroy()
                }
                for (var t in this._webgl) {
                    for (var r = 0; r < this._webgl[t].data.length; ++r) {
                        this._webgl[t].data[r].destroy()
                    }
                }
                this.graphicsData = null;
                this.currentPath = null;
                this._webgl = null;
                this._localBounds = null
            }
        }
        , {
            "../const": 21,
            "../display/Container": 22,
            "../math": 31,
            "../renderers/canvas/utils/CanvasBuffer": 43,
            "../renderers/canvas/utils/CanvasGraphics": 44,
            "../sprites/Sprite": 65,
            "../textures/Texture": 70,
            "./GraphicsData": 25
        }],
        25: [function(f, g, e) {
            function h(i, n, k, o, l, m, j) {
                this.lineWidth = i;
                this.lineColor = n;
                this.lineAlpha = k;
                this._lineTint = n;
                this.fillColor = o;
                this.fillAlpha = l;
                this._fillTint = o;
                this.fill = m;
                this.shape = j;
                this.type = j.type
            }
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.clone = function() {
                return new h(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)
            }
            ;
            h.prototype.destroy = function() {
                this.shape = null
            }
        }
        , {}],
        26: [function(g, f, h) {
            var l = g("../../utils")
              , j = g("../../math")
              , n = g("../../const")
              , m = g("../../renderers/webgl/utils/ObjectRenderer")
              , k = g("../../renderers/webgl/WebGLRenderer")
              , e = g("./WebGLGraphicsData");
            function i(o) {
                m.call(this, o);
                this.graphicsDataPool = [];
                this.primitiveShader = null;
                this.complexPrimitiveShader = null
            }
            i.prototype = Object.create(m.prototype);
            i.prototype.constructor = i;
            f.exports = i;
            k.registerPlugin("graphics", i);
            i.prototype.onContextChange = function() {}
            ;
            i.prototype.destroy = function() {
                m.prototype.destroy.call(this);
                for (var o = 0; o < this.graphicsDataPool.length; ++o) {
                    this.graphicsDataPool[o].destroy()
                }
                this.graphicsDataPool = null
            }
            ;
            i.prototype.render = function(o) {
                var s = this.renderer;
                var u = s.gl;
                var q = s.shaderManager.plugins.primitiveShader, t;
                if (o.dirty) {
                    this.updateGraphics(o, u)
                }
                var r = o._webGL[u.id];
                s.blendModeManager.setBlendMode(o.blendMode);
                for (var p = 0; p < r.data.length; p++) {
                    if (r.data[p].mode === 1) {
                        t = r.data[p];
                        s.stencilManager.pushStencil(o, t, s);
                        u.drawElements(u.TRIANGLE_FAN, 4, u.UNSIGNED_SHORT, (t.indices.length - 4) * 2);
                        s.stencilManager.popStencil(o, t, s)
                    } else {
                        t = r.data[p];
                        q = s.shaderManager.primitiveShader;
                        s.shaderManager.setShader(q);
                        u.uniformMatrix3fv(q.uniforms.translationMatrix._location, false, o.worldTransform.toArray(true));
                        u.uniformMatrix3fv(q.uniforms.projectionMatrix._location, false, s.currentRenderTarget.projectionMatrix.toArray(true));
                        u.uniform3fv(q.uniforms.tint._location, l.hex2rgb(o.tint));
                        u.uniform1f(q.uniforms.alpha._location, o.worldAlpha);
                        u.bindBuffer(u.ARRAY_BUFFER, t.buffer);
                        u.vertexAttribPointer(q.attributes.aVertexPosition, 2, u.FLOAT, false, 4 * 6, 0);
                        u.vertexAttribPointer(q.attributes.aColor, 4, u.FLOAT, false, 4 * 6, 2 * 4);
                        u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, t.indexBuffer);
                        u.drawElements(u.TRIANGLE_STRIP, t.indices.length, u.UNSIGNED_SHORT, 0)
                    }
                }
            }
            ;
            i.prototype.updateGraphics = function(o) {
                var u = this.renderer.gl;
                var s = o._webGL[u.id];
                if (!s) {
                    s = o._webGL[u.id] = {
                        lastIndex: 0,
                        data: [],
                        gl: u
                    }
                }
                o.dirty = false;
                var p;
                if (o.clearDirty) {
                    o.clearDirty = false;
                    for (p = 0; p < s.data.length; p++) {
                        var v = s.data[p];
                        v.reset();
                        this.graphicsDataPool.push(v)
                    }
                    s.data = [];
                    s.lastIndex = 0
                }
                var t;
                for (p = s.lastIndex; p < o.graphicsData.length; p++) {
                    var r = o.graphicsData[p];
                    if (r.type === n.SHAPES.POLY) {
                        r.points = r.shape.points.slice();
                        if (r.shape.closed) {
                            if (r.points[0] !== r.points[r.points.length - 2] || r.points[1] !== r.points[r.points.length - 1]) {
                                r.points.push(r.points[0], r.points[1])
                            }
                        }
                        if (r.fill) {
                            if (r.points.length >= 6) {
                                if (r.points.length < 6 * 2) {
                                    t = this.switchMode(s, 0);
                                    var q = this.buildPoly(r, t);
                                    if (!q) {
                                        t = this.switchMode(s, 1);
                                        this.buildComplexPoly(r, t)
                                    }
                                } else {
                                    t = this.switchMode(s, 1);
                                    this.buildComplexPoly(r, t)
                                }
                            }
                        }
                        if (r.lineWidth > 0) {
                            t = this.switchMode(s, 0);
                            this.buildLine(r, t)
                        }
                    } else {
                        t = this.switchMode(s, 0);
                        if (r.type === n.SHAPES.RECT) {
                            this.buildRectangle(r, t)
                        } else {
                            if (r.type === n.SHAPES.CIRC || r.type === n.SHAPES.ELIP) {
                                this.buildCircle(r, t)
                            } else {
                                if (r.type === n.SHAPES.RREC) {
                                    this.buildRoundedRectangle(r, t)
                                }
                            }
                        }
                    }
                    s.lastIndex++
                }
                for (p = 0; p < s.data.length; p++) {
                    t = s.data[p];
                    if (t.dirty) {
                        t.upload()
                    }
                }
            }
            ;
            i.prototype.switchMode = function(p, o) {
                var q;
                if (!p.data.length) {
                    q = this.graphicsDataPool.pop() || new e(p.gl);
                    q.mode = o;
                    p.data.push(q)
                } else {
                    q = p.data[p.data.length - 1];
                    if ((q.points.length > 320000) || q.mode !== o || o === 1) {
                        q = this.graphicsDataPool.pop() || new e(p.gl);
                        q.mode = o;
                        p.data.push(q)
                    }
                }
                q.dirty = true;
                return q
            }
            ;
            i.prototype.buildRectangle = function(G, u) {
                var s = G.shape;
                var C = s.x;
                var B = s.y;
                var p = s.width;
                var F = s.height;
                if (G.fill) {
                    var t = l.hex2rgb(G.fillColor);
                    var q = G.fillAlpha;
                    var o = t[0] * q;
                    var v = t[1] * q;
                    var A = t[2] * q;
                    var D = u.points;
                    var E = u.indices;
                    var z = D.length / 6;
                    D.push(C, B);
                    D.push(o, v, A, q);
                    D.push(C + p, B);
                    D.push(o, v, A, q);
                    D.push(C, B + F);
                    D.push(o, v, A, q);
                    D.push(C + p, B + F);
                    D.push(o, v, A, q);
                    E.push(z, z, z + 1, z + 2, z + 3, z + 3)
                }
                if (G.lineWidth) {
                    var w = G.points;
                    G.points = [C, B, C + p, B, C + p, B + F, C, B + F, C, B];
                    this.buildLine(G, u);
                    G.points = w
                }
            }
            ;
            i.prototype.buildRoundedRectangle = function(z, K) {
                var o = z.shape;
                var w = o.x;
                var v = o.y;
                var D = o.width;
                var C = o.height;
                var q = o.radius;
                var A = [];
                A.push(w, v + q);
                this.quadraticBezierCurve(w, v + C - q, w, v + C, w + q, v + C, A);
                this.quadraticBezierCurve(w + D - q, v + C, w + D, v + C, w + D, v + C - q, A);
                this.quadraticBezierCurve(w + D, v + q, w + D, v, w + D - q, v, A);
                this.quadraticBezierCurve(w + q, v, w, v, w, v + q + 1e-10, A);
                if (z.fill) {
                    var F = l.hex2rgb(z.fillColor);
                    var s = z.fillAlpha;
                    var B = F[0] * s;
                    var H = F[1] * s;
                    var I = F[2] * s;
                    var J = K.points;
                    var t = K.indices;
                    var p = J.length / 6;
                    var E = l.PolyK.Triangulate(A);
                    var G = 0;
                    for (G = 0; G < E.length; G += 3) {
                        t.push(E[G] + p);
                        t.push(E[G] + p);
                        t.push(E[G + 1] + p);
                        t.push(E[G + 2] + p);
                        t.push(E[G + 2] + p)
                    }
                    for (G = 0; G < A.length; G++) {
                        J.push(A[G], A[++G], B, H, I, s)
                    }
                }
                if (z.lineWidth) {
                    var u = z.points;
                    z.points = A;
                    this.buildLine(z, K);
                    z.points = u
                }
            }
            ;
            i.prototype.quadraticBezierCurve = function(z, v, o, H, q, p, F) {
                var G, s, D, r, u, t, A = 20, E = F || [];
                function w(I, y, x) {
                    var J = y - I;
                    return I + (J * x)
                }
                var B = 0;
                for (var C = 0; C <= A; C++) {
                    B = C / A;
                    G = w(z, o, B);
                    s = w(v, H, B);
                    D = w(o, q, B);
                    r = w(H, p, B);
                    u = w(G, D, B);
                    t = w(s, r, B);
                    E.push(u, t)
                }
                return E
            }
            ;
            i.prototype.buildCircle = function(v, J) {
                var F = v.shape;
                var u = F.x;
                var t = F.y;
                var B;
                var A;
                if (v.type === n.SHAPES.CIRC) {
                    B = F.radius;
                    A = F.radius
                } else {
                    B = F.width;
                    A = F.height
                }
                var w = 40;
                var G = (Math.PI * 2) / w;
                var D = 0;
                if (v.fill) {
                    var C = l.hex2rgb(v.fillColor);
                    var p = v.fillAlpha;
                    var z = C[0] * p;
                    var E = C[1] * p;
                    var H = C[2] * p;
                    var I = J.points;
                    var q = J.indices;
                    var o = I.length / 6;
                    q.push(o);
                    for (D = 0; D < w + 1; D++) {
                        I.push(u, t, z, E, H, p);
                        I.push(u + Math.sin(G * D) * B, t + Math.cos(G * D) * A, z, E, H, p);
                        q.push(o++, o++)
                    }
                    q.push(o - 1)
                }
                if (v.lineWidth) {
                    var s = v.points;
                    v.points = [];
                    for (D = 0; D < w + 1; D++) {
                        v.points.push(u + Math.sin(G * D) * B, t + Math.cos(G * D) * A)
                    }
                    this.buildLine(v, J);
                    v.points = s
                }
            }
            ;
            i.prototype.buildLine = function(ac, M) {
                var Y = 0;
                var P = ac.points;
                if (P.length === 0) {
                    return
                }
                if (ac.lineWidth % 2) {
                    for (Y = 0; Y < P.length; Y++) {
                        P[Y] += 0.5
                    }
                }
                var D = new j.Point(P[0],P[1]);
                var w = new j.Point(P[P.length - 2],P[P.length - 1]);
                if (D.x === w.x && D.y === w.y) {
                    P = P.slice();
                    P.pop();
                    P.pop();
                    w = new j.Point(P[P.length - 2],P[P.length - 1]);
                    var F = w.x + (D.x - w.x) * 0.5;
                    var C = w.y + (D.y - w.y) * 0.5;
                    P.unshift(F, C);
                    P.push(F, C)
                }
                var Z = M.points;
                var u = M.indices;
                var E = P.length / 2;
                var B = P.length;
                var ab = Z.length / 6;
                var o = ac.lineWidth / 2;
                var O = l.hex2rgb(ac.lineColor);
                var X = ac.lineAlpha;
                var U = O[0] * X;
                var aa = O[1] * X;
                var ad = O[2] * X;
                var A, z, R, Q, J, I, t, s;
                var T, S, H, G, q, p;
                var W, N, y, V, L, x;
                var ae, K, v;
                R = P[0];
                Q = P[1];
                J = P[2];
                I = P[3];
                T = -(Q - I);
                S = R - J;
                v = Math.sqrt(T * T + S * S);
                T /= v;
                S /= v;
                T *= o;
                S *= o;
                Z.push(R - T, Q - S, U, aa, ad, X);
                Z.push(R + T, Q + S, U, aa, ad, X);
                for (Y = 1; Y < E - 1; Y++) {
                    R = P[(Y - 1) * 2];
                    Q = P[(Y - 1) * 2 + 1];
                    J = P[(Y) * 2];
                    I = P[(Y) * 2 + 1];
                    t = P[(Y + 1) * 2];
                    s = P[(Y + 1) * 2 + 1];
                    T = -(Q - I);
                    S = R - J;
                    v = Math.sqrt(T * T + S * S);
                    T /= v;
                    S /= v;
                    T *= o;
                    S *= o;
                    H = -(I - s);
                    G = J - t;
                    v = Math.sqrt(H * H + G * G);
                    H /= v;
                    G /= v;
                    H *= o;
                    G *= o;
                    W = (-S + Q) - (-S + I);
                    N = (-T + J) - (-T + R);
                    y = (-T + R) * (-S + I) - (-T + J) * (-S + Q);
                    V = (-G + s) - (-G + I);
                    L = (-H + J) - (-H + t);
                    x = (-H + t) * (-G + I) - (-H + J) * (-G + s);
                    ae = W * L - V * N;
                    if (Math.abs(ae) < 0.1) {
                        ae += 10.1;
                        Z.push(J - T, I - S, U, aa, ad, X);
                        Z.push(J + T, I + S, U, aa, ad, X);
                        continue
                    }
                    A = (N * x - L * y) / ae;
                    z = (V * y - W * x) / ae;
                    K = (A - J) * (A - J) + (z - I) + (z - I);
                    if (K > 140 * 140) {
                        q = T - H;
                        p = S - G;
                        v = Math.sqrt(q * q + p * p);
                        q /= v;
                        p /= v;
                        q *= o;
                        p *= o;
                        Z.push(J - q, I - p);
                        Z.push(U, aa, ad, X);
                        Z.push(J + q, I + p);
                        Z.push(U, aa, ad, X);
                        Z.push(J - q, I - p);
                        Z.push(U, aa, ad, X);
                        B++
                    } else {
                        Z.push(A, z);
                        Z.push(U, aa, ad, X);
                        Z.push(J - (A - J), I - (z - I));
                        Z.push(U, aa, ad, X)
                    }
                }
                R = P[(E - 2) * 2];
                Q = P[(E - 2) * 2 + 1];
                J = P[(E - 1) * 2];
                I = P[(E - 1) * 2 + 1];
                T = -(Q - I);
                S = R - J;
                v = Math.sqrt(T * T + S * S);
                T /= v;
                S /= v;
                T *= o;
                S *= o;
                Z.push(J - T, I - S);
                Z.push(U, aa, ad, X);
                Z.push(J + T, I + S);
                Z.push(U, aa, ad, X);
                u.push(ab);
                for (Y = 0; Y < B; Y++) {
                    u.push(ab++)
                }
                u.push(ab - 1)
            }
            ;
            i.prototype.buildComplexPoly = function(B, u) {
                var z = B.points.slice();
                if (z.length < 6) {
                    return
                }
                var A = u.indices;
                u.points = z;
                u.alpha = B.fillAlpha;
                u.color = l.hex2rgb(B.fillColor);
                var s = Infinity;
                var p = -Infinity;
                var r = Infinity;
                var o = -Infinity;
                var w, v;
                for (var t = 0; t < z.length; t += 2) {
                    w = z[t];
                    v = z[t + 1];
                    s = w < s ? w : s;
                    p = w > p ? w : p;
                    r = v < r ? v : r;
                    o = v > o ? v : o
                }
                z.push(s, r, p, r, p, o, s, o);
                var q = z.length / 2;
                for (t = 0; t < q; t++) {
                    A.push(t)
                }
            }
            ;
            i.prototype.buildPoly = function(C, v) {
                var A = C.points;
                if (A.length < 6) {
                    return
                }
                var z = v.points;
                var B = v.indices;
                var p = A.length / 2;
                var t = l.hex2rgb(C.fillColor);
                var s = C.fillAlpha;
                var o = t[0] * s;
                var w = t[1] * s;
                var y = t[2] * s;
                var q = l.PolyK.Triangulate(A);
                if (!q) {
                    return false
                }
                var x = z.length / 6;
                var u = 0;
                for (u = 0; u < q.length; u += 3) {
                    B.push(q[u] + x);
                    B.push(q[u] + x);
                    B.push(q[u + 1] + x);
                    B.push(q[u + 2] + x);
                    B.push(q[u + 2] + x)
                }
                for (u = 0; u < p; u++) {
                    z.push(A[u * 2], A[u * 2 + 1], o, w, y, s)
                }
                return true
            }
        }
        , {
            "../../const": 21,
            "../../math": 31,
            "../../renderers/webgl/WebGLRenderer": 47,
            "../../renderers/webgl/utils/ObjectRenderer": 61,
            "../../utils": 74,
            "./WebGLGraphicsData": 27
        }],
        27: [function(g, h, f) {
            function e(i) {
                this.gl = i;
                this.color = [0, 0, 0];
                this.points = [];
                this.indices = [];
                this.buffer = i.createBuffer();
                this.indexBuffer = i.createBuffer();
                this.mode = 1;
                this.alpha = 1;
                this.dirty = true;
                this.glPoints = null;
                this.glIndices = null
            }
            e.prototype.constructor = e;
            h.exports = e;
            e.prototype.reset = function() {
                this.points.length = 0;
                this.indices.length = 0
            }
            ;
            e.prototype.upload = function() {
                var i = this.gl;
                this.glPoints = new Float32Array(this.points);
                i.bindBuffer(i.ARRAY_BUFFER, this.buffer);
                i.bufferData(i.ARRAY_BUFFER, this.glPoints, i.STATIC_DRAW);
                this.glIndices = new Uint16Array(this.indices);
                i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                i.bufferData(i.ELEMENT_ARRAY_BUFFER, this.glIndices, i.STATIC_DRAW);
                this.dirty = false
            }
            ;
            e.prototype.destroy = function() {
                this.gl = null;
                this.color = null;
                this.points = null;
                this.indices = null;
                this.gl.deleteBuffer(this.buffer);
                this.gl.deleteBuffer(this.indexBuffer);
                this.buffer = null;
                this.indexBuffer = null;
                this.glPoints = null;
                this.glIndices = null
            }
        }
        , {}],
        28: [function(g, h, f) {
            var e = h.exports = Object.assign(g("./const"), g("./math"), {
                utils: g("./utils"),
                math: g("./math"),
                DisplayObject: g("./display/DisplayObject"),
                Container: g("./display/Container"),
                Sprite: g("./sprites/Sprite"),
                ParticleContainer: g("./particles/ParticleContainer"),
                SpriteRenderer: g("./sprites/webgl/SpriteRenderer"),
                ParticleRenderer: g("./particles/webgl/ParticleRenderer"),
                Text: g("./text/Text"),
                Graphics: g("./graphics/Graphics"),
                GraphicsData: g("./graphics/GraphicsData"),
                GraphicsRenderer: g("./graphics/webgl/GraphicsRenderer"),
                Texture: g("./textures/Texture"),
                BaseTexture: g("./textures/BaseTexture"),
                RenderTexture: g("./textures/RenderTexture"),
                VideoBaseTexture: g("./textures/VideoBaseTexture"),
                TextureUvs: g("./textures/TextureUvs"),
                CanvasRenderer: g("./renderers/canvas/CanvasRenderer"),
                CanvasGraphics: g("./renderers/canvas/utils/CanvasGraphics"),
                CanvasBuffer: g("./renderers/canvas/utils/CanvasBuffer"),
                WebGLRenderer: g("./renderers/webgl/WebGLRenderer"),
                ShaderManager: g("./renderers/webgl/managers/ShaderManager"),
                Shader: g("./renderers/webgl/shaders/Shader"),
                ObjectRenderer: g("./renderers/webgl/utils/ObjectRenderer"),
                RenderTarget: g("./renderers/webgl/utils/RenderTarget"),
                AbstractFilter: g("./renderers/webgl/filters/AbstractFilter"),
                autoDetectRenderer: function(l, i, j, k) {
                    l = l || 800;
                    i = i || 600;
                    if (!k && e.utils.isWebGLSupported()) {
                        return new e.WebGLRenderer(l,i,j)
                    }
                    return new e.CanvasRenderer(l,i,j)
                }
            })
        }
        , {
            "./const": 21,
            "./display/Container": 22,
            "./display/DisplayObject": 23,
            "./graphics/Graphics": 24,
            "./graphics/GraphicsData": 25,
            "./graphics/webgl/GraphicsRenderer": 26,
            "./math": 31,
            "./particles/ParticleContainer": 37,
            "./particles/webgl/ParticleRenderer": 39,
            "./renderers/canvas/CanvasRenderer": 42,
            "./renderers/canvas/utils/CanvasBuffer": 43,
            "./renderers/canvas/utils/CanvasGraphics": 44,
            "./renderers/webgl/WebGLRenderer": 47,
            "./renderers/webgl/filters/AbstractFilter": 48,
            "./renderers/webgl/managers/ShaderManager": 54,
            "./renderers/webgl/shaders/Shader": 59,
            "./renderers/webgl/utils/ObjectRenderer": 61,
            "./renderers/webgl/utils/RenderTarget": 63,
            "./sprites/Sprite": 65,
            "./sprites/webgl/SpriteRenderer": 66,
            "./text/Text": 67,
            "./textures/BaseTexture": 68,
            "./textures/RenderTexture": 69,
            "./textures/Texture": 70,
            "./textures/TextureUvs": 71,
            "./textures/VideoBaseTexture": 72,
            "./utils": 74
        }],
        29: [function(g, h, f) {
            var i = g("./Point");
            function e() {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0
            }
            e.prototype.constructor = e;
            h.exports = e;
            e.prototype.fromArray = function(j) {
                this.a = j[0];
                this.b = j[1];
                this.c = j[3];
                this.d = j[4];
                this.tx = j[2];
                this.ty = j[5]
            }
            ;
            e.prototype.toArray = function(j) {
                if (!this.array) {
                    this.array = new Float32Array(9)
                }
                var k = this.array;
                if (j) {
                    k[0] = this.a;
                    k[1] = this.b;
                    k[2] = 0;
                    k[3] = this.c;
                    k[4] = this.d;
                    k[5] = 0;
                    k[6] = this.tx;
                    k[7] = this.ty;
                    k[8] = 1
                } else {
                    k[0] = this.a;
                    k[1] = this.c;
                    k[2] = this.tx;
                    k[3] = this.b;
                    k[4] = this.d;
                    k[5] = this.ty;
                    k[6] = 0;
                    k[7] = 0;
                    k[8] = 1
                }
                return k
            }
            ;
            e.prototype.apply = function(m, k) {
                k = k || new i();
                var j = m.x;
                var l = m.y;
                k.x = this.a * j + this.c * l + this.tx;
                k.y = this.b * j + this.d * l + this.ty;
                return k
            }
            ;
            e.prototype.applyInverse = function(n, k) {
                k = k || new i();
                var m = 1 / (this.a * this.d + this.c * -this.b);
                var j = n.x;
                var l = n.y;
                k.x = this.d * m * j + -this.c * m * l + (this.ty * this.c - this.tx * this.d) * m;
                k.y = this.a * m * l + -this.b * m * j + (-this.ty * this.a + this.tx * this.b) * m;
                return k
            }
            ;
            e.prototype.translate = function(j, k) {
                this.tx += j;
                this.ty += k;
                return this
            }
            ;
            e.prototype.scale = function(j, k) {
                this.a *= j;
                this.d *= k;
                this.c *= j;
                this.b *= k;
                this.tx *= j;
                this.ty *= k;
                return this
            }
            ;
            e.prototype.rotate = function(o) {
                var n = Math.cos(o);
                var l = Math.sin(o);
                var k = this.a;
                var m = this.c;
                var j = this.tx;
                this.a = k * n - this.b * l;
                this.b = k * l + this.b * n;
                this.c = m * n - this.d * l;
                this.d = m * l + this.d * n;
                this.tx = j * n - this.ty * l;
                this.ty = j * l + this.ty * n;
                return this
            }
            ;
            e.prototype.append = function(k) {
                var j = this.a;
                var l = this.b;
                var m = this.c;
                var n = this.d;
                this.a = k.a * j + k.b * m;
                this.b = k.a * l + k.b * n;
                this.c = k.c * j + k.d * m;
                this.d = k.c * l + k.d * n;
                this.tx = k.tx * j + k.ty * m + this.tx;
                this.ty = k.tx * l + k.ty * n + this.ty;
                return this
            }
            ;
            e.prototype.prepend = function(l) {
                var k = this.tx;
                if (l.a !== 1 || l.b !== 0 || l.c !== 0 || l.d !== 1) {
                    var j = this.a;
                    var m = this.c;
                    this.a = j * l.a + this.b * l.c;
                    this.b = j * l.b + this.b * l.d;
                    this.c = m * l.a + this.d * l.c;
                    this.d = m * l.b + this.d * l.d
                }
                this.tx = k * l.a + this.ty * l.c + l.tx;
                this.ty = k * l.b + this.ty * l.d + l.ty;
                return this
            }
            ;
            e.prototype.invert = function() {
                var k = this.a;
                var l = this.b;
                var m = this.c;
                var o = this.d;
                var j = this.tx;
                var p = k * o - l * m;
                this.a = o / p;
                this.b = -l / p;
                this.c = -m / p;
                this.d = k / p;
                this.tx = (m * this.ty - o * j) / p;
                this.ty = -(k * this.ty - l * j) / p;
                return this
            }
            ;
            e.prototype.identity = function() {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.tx = 0;
                this.ty = 0;
                return this
            }
            ;
            e.prototype.clone = function() {
                var j = new e();
                j.a = this.a;
                j.b = this.b;
                j.c = this.c;
                j.d = this.d;
                j.tx = this.tx;
                j.ty = this.ty;
                return j
            }
            ;
            e.prototype.copy = function(j) {
                j.a = this.a;
                j.b = this.b;
                j.c = this.c;
                j.d = this.d;
                j.tx = this.tx;
                j.ty = this.ty;
                return j
            }
            ;
            e.IDENTITY = new e();
            e.TEMP_MATRIX = new e()
        }
        , {
            "./Point": 30
        }],
        30: [function(f, g, e) {
            function h(i, j) {
                this.x = i || 0;
                this.y = j || 0
            }
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.clone = function() {
                return new h(this.x,this.y)
            }
            ;
            h.prototype.copy = function(i) {
                this.set(i.x, i.y)
            }
            ;
            h.prototype.equals = function(i) {
                return (i.x === this.x) && (i.y === this.y)
            }
            ;
            h.prototype.set = function(i, j) {
                this.x = i || 0;
                this.y = j || ((j !== 0) ? this.x : 0)
            }
        }
        , {}],
        31: [function(f, g, e) {
            g.exports = {
                Point: f("./Point"),
                Matrix: f("./Matrix"),
                Circle: f("./shapes/Circle"),
                Ellipse: f("./shapes/Ellipse"),
                Polygon: f("./shapes/Polygon"),
                Rectangle: f("./shapes/Rectangle"),
                RoundedRectangle: f("./shapes/RoundedRectangle")
            }
        }
        , {
            "./Matrix": 29,
            "./Point": 30,
            "./shapes/Circle": 32,
            "./shapes/Ellipse": 33,
            "./shapes/Polygon": 34,
            "./shapes/Rectangle": 35,
            "./shapes/RoundedRectangle": 36
        }],
        32: [function(g, i, f) {
            var h = g("./Rectangle")
              , e = g("../../const");
            function j(l, m, k) {
                this.x = l || 0;
                this.y = m || 0;
                this.radius = k || 0;
                this.type = e.SHAPES.CIRC
            }
            j.prototype.constructor = j;
            i.exports = j;
            j.prototype.clone = function() {
                return new j(this.x,this.y,this.radius)
            }
            ;
            j.prototype.contains = function(k, o) {
                if (this.radius <= 0) {
                    return false
                }
                var n = (this.x - k)
                  , m = (this.y - o)
                  , l = this.radius * this.radius;
                n *= n;
                m *= m;
                return (n + m <= l)
            }
            ;
            j.prototype.getBounds = function() {
                return new h(this.x - this.radius,this.y - this.radius,this.radius * 2,this.radius * 2)
            }
        }
        , {
            "../../const": 21,
            "./Rectangle": 35
        }],
        33: [function(g, j, f) {
            var i = g("./Rectangle")
              , e = g("../../const");
            function h(l, n, m, k) {
                this.x = l || 0;
                this.y = n || 0;
                this.width = m || 0;
                this.height = k || 0;
                this.type = e.SHAPES.ELIP
            }
            h.prototype.constructor = h;
            j.exports = h;
            h.prototype.clone = function() {
                return new h(this.x,this.y,this.width,this.height)
            }
            ;
            h.prototype.contains = function(l, n) {
                if (this.width <= 0 || this.height <= 0) {
                    return false
                }
                var m = ((l - this.x) / this.width)
                  , k = ((n - this.y) / this.height);
                m *= m;
                k *= k;
                return (m + k <= 1)
            }
            ;
            h.prototype.getBounds = function() {
                return new i(this.x - this.width,this.y - this.height,this.width,this.height)
            }
        }
        , {
            "../../const": 21,
            "./Rectangle": 35
        }],
        34: [function(h, i, g) {
            var j = h("../Point")
              , e = h("../../const");
            function f(l) {
                var o = l;
                if (!Array.isArray(o)) {
                    o = new Array(arguments.length);
                    for (var k = 0; k < o.length; ++k) {
                        o[k] = arguments[k]
                    }
                }
                if (o[0]instanceof j) {
                    var q = [];
                    for (var n = 0, m = o.length; n < m; n++) {
                        q.push(o[n].x, o[n].y)
                    }
                    o = q
                }
                this.closed = true;
                this.points = o;
                this.type = e.SHAPES.POLY
            }
            f.prototype.constructor = f;
            i.exports = f;
            f.prototype.clone = function() {
                return new f(this.points.slice())
            }
            ;
            f.prototype.contains = function(u, t) {
                var n = false;
                var k = this.points.length / 2;
                for (var q = 0, p = k - 1; q < k; p = q++) {
                    var s = this.points[q * 2]
                      , o = this.points[q * 2 + 1]
                      , r = this.points[p * 2]
                      , m = this.points[p * 2 + 1]
                      , l = ((o > t) !== (m > t)) && (u < (r - s) * (t - o) / (m - o) + s);
                    if (l) {
                        n = !n
                    }
                }
                return n
            }
        }
        , {
            "../../const": 21,
            "../Point": 30
        }],
        35: [function(g, i, f) {
            var e = g("../../const");
            function h(k, m, l, j) {
                this.x = k || 0;
                this.y = m || 0;
                this.width = l || 0;
                this.height = j || 0;
                this.type = e.SHAPES.RECT
            }
            h.prototype.constructor = h;
            i.exports = h;
            h.EMPTY = new h(0,0,0,0);
            h.prototype.clone = function() {
                return new h(this.x,this.y,this.width,this.height)
            }
            ;
            h.prototype.contains = function(j, k) {
                if (this.width <= 0 || this.height <= 0) {
                    return false
                }
                if (j >= this.x && j < this.x + this.width) {
                    if (k >= this.y && k < this.y + this.height) {
                        return true
                    }
                }
                return false
            }
        }
        , {
            "../../const": 21
        }],
        36: [function(g, h, f) {
            var e = g("../../const");
            function i(l, n, m, k, j) {
                this.x = l || 0;
                this.y = n || 0;
                this.width = m || 0;
                this.height = k || 0;
                this.radius = j || 20;
                this.type = e.SHAPES.RREC
            }
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.clone = function() {
                return new i(this.x,this.y,this.width,this.height,this.radius)
            }
            ;
            i.prototype.contains = function(j, k) {
                if (this.width <= 0 || this.height <= 0) {
                    return false
                }
                if (j >= this.x && j <= this.x + this.width) {
                    if (k >= this.y && k <= this.y + this.height) {
                        return true
                    }
                }
                return false
            }
        }
        , {
            "../../const": 21
        }],
        37: [function(h, i, g) {
            var f = h("../display/Container")
              , e = h("../const");
            function j(l, k) {
                f.call(this);
                this._properties = [false, true, false, false, false];
                this._size = l || 15000;
                this._buffers = null;
                this._updateStatic = false;
                this.interactiveChildren = false;
                this.blendMode = e.BLEND_MODES.NORMAL;
                this.roundPixels = true;
                this.setProperties(k)
            }
            j.prototype = Object.create(f.prototype);
            j.prototype.constructor = j;
            i.exports = j;
            j.prototype.setProperties = function(k) {
                if (k) {
                    this._properties[0] = "scale"in k ? !!k.scale : this._properties[0];
                    this._properties[1] = "position"in k ? !!k.position : this._properties[1];
                    this._properties[2] = "rotation"in k ? !!k.rotation : this._properties[2];
                    this._properties[3] = "uvs"in k ? !!k.uvs : this._properties[3];
                    this._properties[4] = "alpha"in k ? !!k.alpha : this._properties[4]
                }
            }
            ;
            j.prototype.updateTransform = function() {
                this.displayObjectUpdateTransform()
            }
            ;
            j.prototype.renderWebGL = function(k) {
                if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
                    return
                }
                k.setObjectRenderer(k.plugins.particle);
                k.plugins.particle.render(this)
            }
            ;
            j.prototype.addChildAt = function(l, k) {
                if (l === this) {
                    return l
                }
                if (k >= 0 && k <= this.children.length) {
                    if (l.parent) {
                        l.parent.removeChild(l)
                    }
                    l.parent = this;
                    this.children.splice(k, 0, l);
                    this._updateStatic = true;
                    return l
                } else {
                    throw new Error(l + "addChildAt: The index " + k + " supplied is out of bounds " + this.children.length)
                }
            }
            ;
            j.prototype.removeChildAt = function(k) {
                var l = this.getChildAt(k);
                l.parent = null;
                this.children.splice(k, 1);
                this._updateStatic = true;
                return l
            }
            ;
            j.prototype.renderCanvas = function(u) {
                if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
                    return
                }
                var k = u.context;
                var o = this.worldTransform;
                var v = true;
                var t = 0;
                var s = 0;
                var p = 0;
                var n = 0;
                k.globalAlpha = this.worldAlpha;
                this.displayObjectUpdateTransform();
                for (var q = 0; q < this.children.length; ++q) {
                    var m = this.children[q];
                    if (!m.visible) {
                        continue
                    }
                    var l = m.texture.frame;
                    k.globalAlpha = this.worldAlpha * m.alpha;
                    if (m.rotation % (Math.PI * 2) === 0) {
                        if (v) {
                            k.setTransform(o.a, o.b, o.c, o.d, o.tx, o.ty);
                            v = false
                        }
                        t = ((m.anchor.x) * (-l.width * m.scale.x) + m.position.x + 0.5);
                        s = ((m.anchor.y) * (-l.height * m.scale.y) + m.position.y + 0.5);
                        p = l.width * m.scale.x;
                        n = l.height * m.scale.y
                    } else {
                        if (!v) {
                            v = true
                        }
                        m.displayObjectUpdateTransform();
                        var r = m.worldTransform;
                        if (u.roundPixels) {
                            k.setTransform(r.a, r.b, r.c, r.d, r.tx | 0, r.ty | 0)
                        } else {
                            k.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty)
                        }
                        t = ((m.anchor.x) * (-l.width) + 0.5);
                        s = ((m.anchor.y) * (-l.height) + 0.5);
                        p = l.width;
                        n = l.height
                    }
                    k.drawImage(m.texture.baseTexture.source, l.x, l.y, l.width, l.height, t, s, p, n)
                }
            }
            ;
            j.prototype.destroy = function() {
                f.prototype.destroy.apply(this, arguments);
                if (this._buffers) {
                    for (var k = 0; k < this._buffers.length; ++k) {
                        this._buffers.destroy()
                    }
                }
                this._properties = null;
                this._buffers = null
            }
        }
        , {
            "../const": 21,
            "../display/Container": 22
        }],
        38: [function(f, g, e) {
            function h(n, l, k) {
                this.gl = n;
                this.vertSize = 2;
                this.vertByteSize = this.vertSize * 4;
                this.size = k;
                this.dynamicProperties = [];
                this.staticProperties = [];
                for (var j = 0; j < l.length; j++) {
                    var m = l[j];
                    if (m.dynamic) {
                        this.dynamicProperties.push(m)
                    } else {
                        this.staticProperties.push(m)
                    }
                }
                this.staticStride = 0;
                this.staticBuffer = null;
                this.staticData = null;
                this.dynamicStride = 0;
                this.dynamicBuffer = null;
                this.dynamicData = null;
                this.initBuffers()
            }
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.initBuffers = function() {
                var n = this.gl;
                var j;
                var l;
                var m = 0;
                this.dynamicStride = 0;
                for (j = 0; j < this.dynamicProperties.length; j++) {
                    l = this.dynamicProperties[j];
                    l.offset = m;
                    m += l.size;
                    this.dynamicStride += l.size
                }
                this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4);
                this.dynamicBuffer = n.createBuffer();
                n.bindBuffer(n.ARRAY_BUFFER, this.dynamicBuffer);
                n.bufferData(n.ARRAY_BUFFER, this.dynamicData, n.DYNAMIC_DRAW);
                var k = 0;
                this.staticStride = 0;
                for (j = 0; j < this.staticProperties.length; j++) {
                    l = this.staticProperties[j];
                    l.offset = k;
                    k += l.size;
                    this.staticStride += l.size
                }
                this.staticData = new Float32Array(this.size * this.staticStride * 4);
                this.staticBuffer = n.createBuffer();
                n.bindBuffer(n.ARRAY_BUFFER, this.staticBuffer);
                n.bufferData(n.ARRAY_BUFFER, this.staticData, n.DYNAMIC_DRAW)
            }
            ;
            h.prototype.uploadDynamic = function(l, o, k) {
                var n = this.gl;
                for (var j = 0; j < this.dynamicProperties.length; j++) {
                    var m = this.dynamicProperties[j];
                    m.uploadFunction(l, o, k, this.dynamicData, this.dynamicStride, m.offset)
                }
                n.bindBuffer(n.ARRAY_BUFFER, this.dynamicBuffer);
                n.bufferSubData(n.ARRAY_BUFFER, 0, this.dynamicData)
            }
            ;
            h.prototype.uploadStatic = function(l, o, k) {
                var n = this.gl;
                for (var j = 0; j < this.staticProperties.length; j++) {
                    var m = this.staticProperties[j];
                    m.uploadFunction(l, o, k, this.staticData, this.staticStride, m.offset)
                }
                n.bindBuffer(n.ARRAY_BUFFER, this.staticBuffer);
                n.bufferSubData(n.ARRAY_BUFFER, 0, this.staticData)
            }
            ;
            h.prototype.bind = function() {
                var l = this.gl;
                var j, k;
                l.bindBuffer(l.ARRAY_BUFFER, this.dynamicBuffer);
                for (j = 0; j < this.dynamicProperties.length; j++) {
                    k = this.dynamicProperties[j];
                    l.vertexAttribPointer(k.attribute, k.size, l.FLOAT, false, this.dynamicStride * 4, k.offset * 4)
                }
                l.bindBuffer(l.ARRAY_BUFFER, this.staticBuffer);
                for (j = 0; j < this.staticProperties.length; j++) {
                    k = this.staticProperties[j];
                    l.vertexAttribPointer(k.attribute, k.size, l.FLOAT, false, this.staticStride * 4, k.offset * 4)
                }
            }
            ;
            h.prototype.destroy = function() {
                this.dynamicProperties = null;
                this.dynamicData = null;
                this.gl.deleteBuffer(this.dynamicBuffer);
                this.staticProperties = null;
                this.staticData = null;
                this.gl.deleteBuffer(this.staticBuffer)
            }
        }
        , {}],
        39: [function(h, g, j) {
            var m = h("../../renderers/webgl/utils/ObjectRenderer")
              , l = h("../../renderers/webgl/WebGLRenderer")
              , i = h("./ParticleShader")
              , f = h("./ParticleBuffer")
              , k = h("../../math");
            function e(p) {
                m.call(this, p);
                this.size = 15000;
                var q = this.size * 6;
                this.indices = new Uint16Array(q);
                for (var o = 0, n = 0; o < q; o += 6,
                n += 4) {
                    this.indices[o + 0] = n + 0;
                    this.indices[o + 1] = n + 1;
                    this.indices[o + 2] = n + 2;
                    this.indices[o + 3] = n + 0;
                    this.indices[o + 4] = n + 2;
                    this.indices[o + 5] = n + 3
                }
                this.shader = null;
                this.indexBuffer = null;
                this.properties = null;
                this.tempMatrix = new k.Matrix()
            }
            e.prototype = Object.create(m.prototype);
            e.prototype.constructor = e;
            g.exports = e;
            l.registerPlugin("particle", e);
            e.prototype.onContextChange = function() {
                var n = this.renderer.gl;
                this.shader = new i(this.renderer.shaderManager);
                this.indexBuffer = n.createBuffer();
                n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                n.bufferData(n.ELEMENT_ARRAY_BUFFER, this.indices, n.STATIC_DRAW);
                this.properties = [{
                    attribute: this.shader.attributes.aVertexPosition,
                    dynamic: false,
                    size: 2,
                    uploadFunction: this.uploadVertices,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aPositionCoord,
                    dynamic: true,
                    size: 2,
                    uploadFunction: this.uploadPosition,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aRotation,
                    dynamic: false,
                    size: 1,
                    uploadFunction: this.uploadRotation,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aTextureCoord,
                    dynamic: false,
                    size: 2,
                    uploadFunction: this.uploadUvs,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aColor,
                    dynamic: false,
                    size: 1,
                    uploadFunction: this.uploadAlpha,
                    offset: 0
                }]
            }
            ;
            e.prototype.start = function() {
                var o = this.renderer.gl;
                o.activeTexture(o.TEXTURE0);
                o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var n = this.shader;
                this.renderer.shaderManager.setShader(n)
            }
            ;
            e.prototype.render = function(o) {
                var p = o.children
                  , w = p.length
                  , x = o._size;
                if (w === 0) {
                    return
                } else {
                    if (w > x) {
                        w = x
                    }
                }
                if (!o._buffers) {
                    o._buffers = this.generateBuffers(o)
                }
                this.renderer.blendModeManager.setBlendMode(o.blendMode);
                var v = this.renderer.gl;
                var q = o.worldTransform.copy(this.tempMatrix);
                q.prepend(this.renderer.currentRenderTarget.projectionMatrix);
                v.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location, false, q.toArray(true));
                v.uniform1f(this.shader.uniforms.uAlpha._location, o.worldAlpha);
                var y = o._updateStatic;
                var n = p[0]._texture.baseTexture;
                if (!n._glTextures[v.id]) {
                    if (!this.renderer.updateTexture(n)) {
                        return
                    }
                    if (!this.properties[0].dynamic || !this.properties[3].dynamic) {
                        y = true
                    }
                } else {
                    v.bindTexture(v.TEXTURE_2D, n._glTextures[v.id])
                }
                var s = 0;
                for (var t = 0; t < w; t += this.size) {
                    var u = (w - t);
                    if (u > this.size) {
                        u = this.size
                    }
                    var r = o._buffers[s++];
                    r.uploadDynamic(p, t, u);
                    if (y) {
                        r.uploadStatic(p, t, u)
                    }
                    r.bind(this.shader);
                    v.drawElements(v.TRIANGLES, u * 6, v.UNSIGNED_SHORT, 0);
                    this.renderer.drawCount++
                }
                o._updateStatic = false
            }
            ;
            e.prototype.generateBuffers = function(o) {
                var r = this.renderer.gl, n = [], q = o._size, p;
                for (p = 0; p < o._properties.length; p++) {
                    this.properties[p].dynamic = o._properties[p]
                }
                for (p = 0; p < q; p += this.size) {
                    n.push(new f(r,this.properties,this.size,this.shader))
                }
                return n
            }
            ;
            e.prototype.uploadVertices = function(o, B, t, v, n, q) {
                var C, w, p, A, z, u, s, y, x;
                for (var r = 0; r < t; r++) {
                    C = o[B + r];
                    w = C._texture;
                    A = C.scale.x;
                    z = C.scale.y;
                    if (w.trim) {
                        p = w.trim;
                        s = p.x - C.anchor.x * p.width;
                        u = s + w.crop.width;
                        x = p.y - C.anchor.y * p.height;
                        y = x + w.crop.height
                    } else {
                        u = (w._frame.width) * (1 - C.anchor.x);
                        s = (w._frame.width) * -C.anchor.x;
                        y = w._frame.height * (1 - C.anchor.y);
                        x = w._frame.height * -C.anchor.y
                    }
                    v[q] = s * A;
                    v[q + 1] = x * z;
                    v[q + n] = u * A;
                    v[q + n + 1] = x * z;
                    v[q + n * 2] = u * A;
                    v[q + n * 2 + 1] = y * z;
                    v[q + n * 3] = s * A;
                    v[q + n * 3 + 1] = y * z;
                    q += n * 4
                }
            }
            ;
            e.prototype.uploadPosition = function(p, t, o, u, r, s) {
                for (var n = 0; n < o; n++) {
                    var q = p[t + n].position;
                    u[s] = q.x;
                    u[s + 1] = q.y;
                    u[s + r] = q.x;
                    u[s + r + 1] = q.y;
                    u[s + r * 2] = q.x;
                    u[s + r * 2 + 1] = q.y;
                    u[s + r * 3] = q.x;
                    u[s + r * 3 + 1] = q.y;
                    s += r * 4
                }
            }
            ;
            e.prototype.uploadRotation = function(q, t, p, u, r, s) {
                for (var o = 0; o < p; o++) {
                    var n = q[t + o].rotation;
                    u[s] = n;
                    u[s + r] = n;
                    u[s + r * 2] = n;
                    u[s + r * 3] = n;
                    s += r * 4
                }
            }
            ;
            e.prototype.uploadUvs = function(q, t, p, u, r, s) {
                for (var o = 0; o < p; o++) {
                    var n = q[t + o]._texture._uvs;
                    if (n) {
                        u[s] = n.x0;
                        u[s + 1] = n.y0;
                        u[s + r] = n.x1;
                        u[s + r + 1] = n.y1;
                        u[s + r * 2] = n.x2;
                        u[s + r * 2 + 1] = n.y2;
                        u[s + r * 3] = n.x3;
                        u[s + r * 3 + 1] = n.y3;
                        s += r * 4
                    } else {
                        u[s] = 0;
                        u[s + 1] = 0;
                        u[s + r] = 0;
                        u[s + r + 1] = 0;
                        u[s + r * 2] = 0;
                        u[s + r * 2 + 1] = 0;
                        u[s + r * 3] = 0;
                        u[s + r * 3 + 1] = 0;
                        s += r * 4
                    }
                }
            }
            ;
            e.prototype.uploadAlpha = function(p, t, o, u, r, s) {
                for (var n = 0; n < o; n++) {
                    var q = p[t + n].alpha;
                    u[s] = q;
                    u[s + r] = q;
                    u[s + r * 2] = q;
                    u[s + r * 3] = q;
                    s += r * 4
                }
            }
            ;
            e.prototype.destroy = function() {
                if (this.renderer.gl) {
                    this.renderer.gl.deleteBuffer(this.indexBuffer)
                }
                m.prototype.destroy.apply(this, arguments);
                this.shader.destroy();
                this.indices = null;
                this.tempMatrix = null
            }
        }
        , {
            "../../math": 31,
            "../../renderers/webgl/WebGLRenderer": 47,
            "../../renderers/webgl/utils/ObjectRenderer": 61,
            "./ParticleBuffer": 38,
            "./ParticleShader": 40
        }],
        40: [function(h, i, f) {
            var g = h("../../renderers/webgl/shaders/TextureShader");
            function e(j) {
                g.call(this, j, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * uAlpha ;", "}"].join("\n"), {
                    uAlpha: {
                        type: "1f",
                        value: 1
                    }
                }, {
                    aPositionCoord: 0,
                    aRotation: 0
                })
            }
            e.prototype = Object.create(g.prototype);
            e.prototype.constructor = e;
            i.exports = e
        }
        , {
            "../../renderers/webgl/shaders/TextureShader": 60
        }],
        41: [function(i, j, h) {
            var g = i("../utils")
              , l = i("../math")
              , e = i("../const")
              , k = i("eventemitter3");
            function f(q, p, m, n) {
                k.call(this);
                g.sayHello(q);
                if (n) {
                    for (var o in e.DEFAULT_RENDER_OPTIONS) {
                        if (typeof n[o] === "undefined") {
                            n[o] = e.DEFAULT_RENDER_OPTIONS[o]
                        }
                    }
                } else {
                    n = e.DEFAULT_RENDER_OPTIONS
                }
                this.type = e.RENDERER_TYPE.UNKNOWN;
                this.width = p || 800;
                this.height = m || 600;
                this.view = n.view || document.createElement("canvas");
                this.resolution = n.resolution;
                this.transparent = n.transparent;
                this.autoResize = n.autoResize || false;
                this.blendModes = null;
                this.preserveDrawingBuffer = n.preserveDrawingBuffer;
                this.clearBeforeRender = n.clearBeforeRender;
                this._backgroundColor = 0;
                this._backgroundColorRgb = [0, 0, 0];
                this._backgroundColorString = "#000000";
                this.backgroundColor = n.backgroundColor || this._backgroundColor;
                this._tempDisplayObjectParent = {
                    worldTransform: new l.Matrix(),
                    worldAlpha: 1,
                    children: []
                };
                this._lastObjectRendered = this._tempDisplayObjectParent
            }
            f.prototype = Object.create(k.prototype);
            f.prototype.constructor = f;
            j.exports = f;
            Object.defineProperties(f.prototype, {
                backgroundColor: {
                    get: function() {
                        return this._backgroundColor
                    },
                    set: function(m) {
                        this._backgroundColor = m;
                        this._backgroundColorString = g.hex2string(m);
                        g.hex2rgb(m, this._backgroundColorRgb)
                    }
                }
            });
            f.prototype.resize = function(n, m) {
                this.width = n * this.resolution;
                this.height = m * this.resolution;
                this.view.width = this.width;
                this.view.height = this.height;
                if (this.autoResize) {
                    this.view.style.width = this.width / this.resolution + "px";
                    this.view.style.height = this.height / this.resolution + "px"
                }
            }
            ;
            f.prototype.destroy = function(m) {
                if (m && this.view.parent) {
                    this.view.parent.removeChild(this.view)
                }
                this.type = e.RENDERER_TYPE.UNKNOWN;
                this.width = 0;
                this.height = 0;
                this.view = null;
                this.resolution = 0;
                this.transparent = false;
                this.autoResize = false;
                this.blendModes = null;
                this.preserveDrawingBuffer = false;
                this.clearBeforeRender = false;
                this._backgroundColor = 0;
                this._backgroundColorRgb = null;
                this._backgroundColorString = null
            }
        }
        , {
            "../const": 21,
            "../math": 31,
            "../utils": 74,
            eventemitter3: 10
        }],
        42: [function(g, f, h) {
            var l = g("../SystemRenderer")
              , e = g("./utils/CanvasMaskManager")
              , k = g("../../utils")
              , j = g("../../math")
              , m = g("../../const");
            function i(p, n, o) {
                l.call(this, "Canvas", p, n, o);
                this.type = m.RENDERER_TYPE.CANVAS;
                this.context = this.view.getContext("2d", {
                    alpha: this.transparent
                });
                this.refresh = true;
                this.maskManager = new e();
                this.roundPixels = false;
                this.currentScaleMode = m.SCALE_MODES.DEFAULT;
                this.currentBlendMode = m.BLEND_MODES.NORMAL;
                this.smoothProperty = "imageSmoothingEnabled";
                if (!this.context.imageSmoothingEnabled) {
                    if (this.context.webkitImageSmoothingEnabled) {
                        this.smoothProperty = "webkitImageSmoothingEnabled"
                    } else {
                        if (this.context.mozImageSmoothingEnabled) {
                            this.smoothProperty = "mozImageSmoothingEnabled"
                        } else {
                            if (this.context.oImageSmoothingEnabled) {
                                this.smoothProperty = "oImageSmoothingEnabled"
                            } else {
                                if (this.context.msImageSmoothingEnabled) {
                                    this.smoothProperty = "msImageSmoothingEnabled"
                                }
                            }
                        }
                    }
                }
                this.initPlugins();
                this._mapBlendModes();
                this._tempDisplayObjectParent = {
                    worldTransform: new j.Matrix(),
                    worldAlpha: 1
                };
                this.resize(p, n)
            }
            i.prototype = Object.create(l.prototype);
            i.prototype.constructor = i;
            f.exports = i;
            k.pluginTarget.mixin(i);
            i.prototype.render = function(n) {
                var o = n.parent;
                this._lastObjectRendered = n;
                n.parent = this._tempDisplayObjectParent;
                n.updateTransform();
                n.parent = o;
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.globalAlpha = 1;
                this.currentBlendMode = m.BLEND_MODES.NORMAL;
                this.context.globalCompositeOperation = this.blendModes[m.BLEND_MODES.NORMAL];
                if (navigator.isCocoonJS && this.view.screencanvas) {
                    this.context.fillStyle = "black";
                    this.context.clear()
                }
                if (this.clearBeforeRender) {
                    if (this.transparent) {
                        this.context.clearRect(0, 0, this.width, this.height)
                    } else {
                        this.context.fillStyle = this._backgroundColorString;
                        this.context.fillRect(0, 0, this.width, this.height)
                    }
                }
                this.renderDisplayObject(n, this.context)
            }
            ;
            i.prototype.destroy = function(n) {
                this.destroyPlugins();
                l.prototype.destroy.call(this, n);
                this.context = null;
                this.refresh = true;
                this.maskManager.destroy();
                this.maskManager = null;
                this.roundPixels = false;
                this.currentScaleMode = 0;
                this.currentBlendMode = 0;
                this.smoothProperty = null
            }
            ;
            i.prototype.renderDisplayObject = function(p, o) {
                var n = this.context;
                this.context = o;
                p.renderCanvas(this);
                this.context = n
            }
            ;
            i.prototype._mapBlendModes = function() {
                if (!this.blendModes) {
                    this.blendModes = {};
                    if (k.canUseNewCanvasBlendModes()) {
                        this.blendModes[m.BLEND_MODES.NORMAL] = "source-over";
                        this.blendModes[m.BLEND_MODES.ADD] = "lighter";
                        this.blendModes[m.BLEND_MODES.MULTIPLY] = "multiply";
                        this.blendModes[m.BLEND_MODES.SCREEN] = "screen";
                        this.blendModes[m.BLEND_MODES.OVERLAY] = "overlay";
                        this.blendModes[m.BLEND_MODES.DARKEN] = "darken";
                        this.blendModes[m.BLEND_MODES.LIGHTEN] = "lighten";
                        this.blendModes[m.BLEND_MODES.COLOR_DODGE] = "color-dodge";
                        this.blendModes[m.BLEND_MODES.COLOR_BURN] = "color-burn";
                        this.blendModes[m.BLEND_MODES.HARD_LIGHT] = "hard-light";
                        this.blendModes[m.BLEND_MODES.SOFT_LIGHT] = "soft-light";
                        this.blendModes[m.BLEND_MODES.DIFFERENCE] = "difference";
                        this.blendModes[m.BLEND_MODES.EXCLUSION] = "exclusion";
                        this.blendModes[m.BLEND_MODES.HUE] = "hue";
                        this.blendModes[m.BLEND_MODES.SATURATION] = "saturation";
                        this.blendModes[m.BLEND_MODES.COLOR] = "color";
                        this.blendModes[m.BLEND_MODES.LUMINOSITY] = "luminosity"
                    } else {
                        this.blendModes[m.BLEND_MODES.NORMAL] = "source-over";
                        this.blendModes[m.BLEND_MODES.ADD] = "lighter";
                        this.blendModes[m.BLEND_MODES.MULTIPLY] = "source-over";
                        this.blendModes[m.BLEND_MODES.SCREEN] = "source-over";
                        this.blendModes[m.BLEND_MODES.OVERLAY] = "source-over";
                        this.blendModes[m.BLEND_MODES.DARKEN] = "source-over";
                        this.blendModes[m.BLEND_MODES.LIGHTEN] = "source-over";
                        this.blendModes[m.BLEND_MODES.COLOR_DODGE] = "source-over";
                        this.blendModes[m.BLEND_MODES.COLOR_BURN] = "source-over";
                        this.blendModes[m.BLEND_MODES.HARD_LIGHT] = "source-over";
                        this.blendModes[m.BLEND_MODES.SOFT_LIGHT] = "source-over";
                        this.blendModes[m.BLEND_MODES.DIFFERENCE] = "source-over";
                        this.blendModes[m.BLEND_MODES.EXCLUSION] = "source-over";
                        this.blendModes[m.BLEND_MODES.HUE] = "source-over";
                        this.blendModes[m.BLEND_MODES.SATURATION] = "source-over";
                        this.blendModes[m.BLEND_MODES.COLOR] = "source-over";
                        this.blendModes[m.BLEND_MODES.LUMINOSITY] = "source-over"
                    }
                }
            }
        }
        , {
            "../../const": 21,
            "../../math": 31,
            "../../utils": 74,
            "../SystemRenderer": 41,
            "./utils/CanvasMaskManager": 45
        }],
        43: [function(f, h, e) {
            function g(j, i) {
                this.canvas = document.createElement("canvas");
                this.context = this.canvas.getContext("2d");
                this.canvas.width = j;
                this.canvas.height = i
            }
            g.prototype.constructor = g;
            h.exports = g;
            Object.defineProperties(g.prototype, {
                width: {
                    get: function() {
                        return this.canvas.width
                    },
                    set: function(i) {
                        this.canvas.width = i
                    }
                },
                height: {
                    get: function() {
                        return this.canvas.height
                    },
                    set: function(i) {
                        this.canvas.height = i
                    }
                }
            });
            g.prototype.clear = function() {
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            }
            ;
            g.prototype.resize = function(j, i) {
                this.canvas.width = j;
                this.canvas.height = i
            }
            ;
            g.prototype.destroy = function() {
                this.context = null;
                this.canvas = null
            }
        }
        , {}],
        44: [function(g, h, f) {
            var e = g("../../../const");
            var i = h.exports = {};
            i.renderGraphics = function(L, n) {
                var G = L.worldAlpha;
                if (L.dirty) {
                    this.updateGraphicsTint(L);
                    L.dirty = false
                }
                for (var J = 0; J < L.graphicsData.length; J++) {
                    var N = L.graphicsData[J];
                    var m = N.shape;
                    var s = N._fillTint;
                    var l = N._lineTint;
                    n.lineWidth = N.lineWidth;
                    if (N.type === e.SHAPES.POLY) {
                        n.beginPath();
                        var I = m.points;
                        n.moveTo(I[0], I[1]);
                        for (var H = 1; H < I.length / 2; H++) {
                            n.lineTo(I[H * 2], I[H * 2 + 1])
                        }
                        if (m.closed) {
                            n.lineTo(I[0], I[1])
                        }
                        if (I[0] === I[I.length - 2] && I[1] === I[I.length - 1]) {
                            n.closePath()
                        }
                        if (N.fill) {
                            n.globalAlpha = N.fillAlpha * G;
                            n.fillStyle = "#" + ("00000" + (s | 0).toString(16)).substr(-6);
                            n.fill()
                        }
                        if (N.lineWidth) {
                            n.globalAlpha = N.lineAlpha * G;
                            n.strokeStyle = "#" + ("00000" + (l | 0).toString(16)).substr(-6);
                            n.stroke()
                        }
                    } else {
                        if (N.type === e.SHAPES.RECT) {
                            if (N.fillColor || N.fillColor === 0) {
                                n.globalAlpha = N.fillAlpha * G;
                                n.fillStyle = "#" + ("00000" + (s | 0).toString(16)).substr(-6);
                                n.fillRect(m.x, m.y, m.width, m.height)
                            }
                            if (N.lineWidth) {
                                n.globalAlpha = N.lineAlpha * G;
                                n.strokeStyle = "#" + ("00000" + (l | 0).toString(16)).substr(-6);
                                n.strokeRect(m.x, m.y, m.width, m.height)
                            }
                        } else {
                            if (N.type === e.SHAPES.CIRC) {
                                n.beginPath();
                                n.arc(m.x, m.y, m.radius, 0, 2 * Math.PI);
                                n.closePath();
                                if (N.fill) {
                                    n.globalAlpha = N.fillAlpha * G;
                                    n.fillStyle = "#" + ("00000" + (s | 0).toString(16)).substr(-6);
                                    n.fill()
                                }
                                if (N.lineWidth) {
                                    n.globalAlpha = N.lineAlpha * G;
                                    n.strokeStyle = "#" + ("00000" + (l | 0).toString(16)).substr(-6);
                                    n.stroke()
                                }
                            } else {
                                if (N.type === e.SHAPES.ELIP) {
                                    var A = m.width * 2;
                                    var K = m.height * 2;
                                    var z = m.x - A / 2;
                                    var v = m.y - K / 2;
                                    n.beginPath();
                                    var B = 0.5522848
                                      , r = (A / 2) * B
                                      , p = (K / 2) * B
                                      , F = z + A
                                      , k = v + K
                                      , C = z + A / 2
                                      , M = v + K / 2;
                                    n.moveTo(z, M);
                                    n.bezierCurveTo(z, M - p, C - r, v, C, v);
                                    n.bezierCurveTo(C + r, v, F, M - p, F, M);
                                    n.bezierCurveTo(F, M + p, C + r, k, C, k);
                                    n.bezierCurveTo(C - r, k, z, M + p, z, M);
                                    n.closePath();
                                    if (N.fill) {
                                        n.globalAlpha = N.fillAlpha * G;
                                        n.fillStyle = "#" + ("00000" + (s | 0).toString(16)).substr(-6);
                                        n.fill()
                                    }
                                    if (N.lineWidth) {
                                        n.globalAlpha = N.lineAlpha * G;
                                        n.strokeStyle = "#" + ("00000" + (l | 0).toString(16)).substr(-6);
                                        n.stroke()
                                    }
                                } else {
                                    if (N.type === e.SHAPES.RREC) {
                                        var t = m.x;
                                        var q = m.y;
                                        var E = m.width;
                                        var D = m.height;
                                        var o = m.radius;
                                        var u = Math.min(E, D) / 2 | 0;
                                        o = o > u ? u : o;
                                        n.beginPath();
                                        n.moveTo(t, q + o);
                                        n.lineTo(t, q + D - o);
                                        n.quadraticCurveTo(t, q + D, t + o, q + D);
                                        n.lineTo(t + E - o, q + D);
                                        n.quadraticCurveTo(t + E, q + D, t + E, q + D - o);
                                        n.lineTo(t + E, q + o);
                                        n.quadraticCurveTo(t + E, q, t + E - o, q);
                                        n.lineTo(t + o, q);
                                        n.quadraticCurveTo(t, q, t, q + o);
                                        n.closePath();
                                        if (N.fillColor || N.fillColor === 0) {
                                            n.globalAlpha = N.fillAlpha * G;
                                            n.fillStyle = "#" + ("00000" + (s | 0).toString(16)).substr(-6);
                                            n.fill()
                                        }
                                        if (N.lineWidth) {
                                            n.globalAlpha = N.lineAlpha * G;
                                            n.strokeStyle = "#" + ("00000" + (l | 0).toString(16)).substr(-6);
                                            n.stroke()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ;
            i.renderGraphicsMask = function(J, m) {
                var H = J.graphicsData.length;
                if (H === 0) {
                    return
                }
                m.beginPath();
                for (var G = 0; G < H; G++) {
                    var L = J.graphicsData[G];
                    var l = L.shape;
                    if (L.type === e.SHAPES.POLY) {
                        var F = l.points;
                        m.moveTo(F[0], F[1]);
                        for (var E = 1; E < F.length / 2; E++) {
                            m.lineTo(F[E * 2], F[E * 2 + 1])
                        }
                        if (F[0] === F[F.length - 2] && F[1] === F[F.length - 1]) {
                            m.closePath()
                        }
                    } else {
                        if (L.type === e.SHAPES.RECT) {
                            m.rect(l.x, l.y, l.width, l.height);
                            m.closePath()
                        } else {
                            if (L.type === e.SHAPES.CIRC) {
                                m.arc(l.x, l.y, l.radius, 0, 2 * Math.PI);
                                m.closePath()
                            } else {
                                if (L.type === e.SHAPES.ELIP) {
                                    var v = l.width * 2;
                                    var I = l.height * 2;
                                    var u = l.x - v / 2;
                                    var t = l.y - I / 2;
                                    var z = 0.5522848
                                      , q = (v / 2) * z
                                      , o = (I / 2) * z
                                      , D = u + v
                                      , k = t + I
                                      , A = u + v / 2
                                      , K = t + I / 2;
                                    m.moveTo(u, K);
                                    m.bezierCurveTo(u, K - o, A - q, t, A, t);
                                    m.bezierCurveTo(A + q, t, D, K - o, D, K);
                                    m.bezierCurveTo(D, K + o, A + q, k, A, k);
                                    m.bezierCurveTo(A - q, k, u, K + o, u, K);
                                    m.closePath()
                                } else {
                                    if (L.type === e.SHAPES.RREC) {
                                        var r = l.x;
                                        var p = l.y;
                                        var C = l.width;
                                        var B = l.height;
                                        var n = l.radius;
                                        var s = Math.min(C, B) / 2 | 0;
                                        n = n > s ? s : n;
                                        m.moveTo(r, p + n);
                                        m.lineTo(r, p + B - n);
                                        m.quadraticCurveTo(r, p + B, r + n, p + B);
                                        m.lineTo(r + C - n, p + B);
                                        m.quadraticCurveTo(r + C, p + B, r + C, p + B - n);
                                        m.lineTo(r + C, p + n);
                                        m.quadraticCurveTo(r + C, p, r + C - n, p);
                                        m.lineTo(r + n, p);
                                        m.quadraticCurveTo(r, p, r, p + n);
                                        m.closePath()
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ;
            i.updateGraphicsTint = function(l) {
                if (l.tint === 16777215) {
                    return
                }
                var k = (l.tint >> 16 & 255) / 255;
                var j = (l.tint >> 8 & 255) / 255;
                var o = (l.tint & 255) / 255;
                for (var m = 0; m < l.graphicsData.length; m++) {
                    var n = l.graphicsData[m];
                    var q = n.fillColor | 0;
                    var p = n.lineColor | 0;
                    n._fillTint = (((q >> 16 & 255) / 255 * k * 255 << 16) + ((q >> 8 & 255) / 255 * j * 255 << 8) + (q & 255) / 255 * o * 255);
                    n._lineTint = (((p >> 16 & 255) / 255 * k * 255 << 16) + ((p >> 8 & 255) / 255 * j * 255 << 8) + (p & 255) / 255 * o * 255)
                }
            }
        }
        , {
            "../../../const": 21
        }],
        45: [function(f, g, e) {
            var i = f("./CanvasGraphics");
            function h() {}
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.pushMask = function(n, m) {
                m.context.save();
                var j = n.alpha;
                var l = n.worldTransform;
                var k = m.resolution;
                m.context.setTransform(l.a * k, l.b * k, l.c * k, l.d * k, l.tx * k, l.ty * k);
                if (!n.texture) {
                    i.renderGraphicsMask(n, m.context);
                    m.context.clip()
                }
                n.worldAlpha = j
            }
            ;
            h.prototype.popMask = function(j) {
                j.context.restore()
            }
        }
        , {
            "./CanvasGraphics": 44
        }],
        46: [function(g, h, f) {
            var e = g("../../../utils");
            var i = h.exports = {};
            i.getTintedTexture = function(m, j) {
                var o = m.texture;
                j = i.roundColor(j);
                var n = "#" + ("00000" + (j | 0).toString(16)).substr(-6);
                o.tintCache = o.tintCache || {};
                if (o.tintCache[n]) {
                    return o.tintCache[n]
                }
                var k = i.canvas || document.createElement("canvas");
                i.tintMethod(o, j, k);
                if (i.convertTintToImage) {
                    var l = new Image();
                    l.src = k.toDataURL();
                    o.tintCache[n] = l
                } else {
                    o.tintCache[n] = k;
                    i.canvas = null
                }
                return k
            }
            ;
            i.tintWithMultiply = function(n, j, k) {
                var l = k.getContext("2d");
                var m = n.crop;
                k.width = m.width;
                k.height = m.height;
                l.fillStyle = "#" + ("00000" + (j | 0).toString(16)).substr(-6);
                l.fillRect(0, 0, m.width, m.height);
                l.globalCompositeOperation = "multiply";
                l.drawImage(n.baseTexture.source, m.x, m.y, m.width, m.height, 0, 0, m.width, m.height);
                l.globalCompositeOperation = "destination-atop";
                l.drawImage(n.baseTexture.source, m.x, m.y, m.width, m.height, 0, 0, m.width, m.height)
            }
            ;
            i.tintWithOverlay = function(n, j, k) {
                var l = k.getContext("2d");
                var m = n.crop;
                k.width = m.width;
                k.height = m.height;
                l.globalCompositeOperation = "copy";
                l.fillStyle = "#" + ("00000" + (j | 0).toString(16)).substr(-6);
                l.fillRect(0, 0, m.width, m.height);
                l.globalCompositeOperation = "destination-atop";
                l.drawImage(n.baseTexture.source, m.x, m.y, m.width, m.height, 0, 0, m.width, m.height)
            }
            ;
            i.tintWithPerPixel = function(t, o, m) {
                var l = m.getContext("2d");
                var q = t.crop;
                m.width = q.width;
                m.height = q.height;
                l.globalCompositeOperation = "copy";
                l.drawImage(t.baseTexture.source, q.x, q.y, q.width, q.height, 0, 0, q.width, q.height);
                var k = e.hex2rgb(o);
                var j = k[0]
                  , s = k[1]
                  , u = k[2];
                var v = l.getImageData(0, 0, q.width, q.height);
                var n = v.data;
                for (var p = 0; p < n.length; p += 4) {
                    n[p + 0] *= j;
                    n[p + 1] *= s;
                    n[p + 2] *= u
                }
                l.putImageData(v, 0, 0)
            }
            ;
            i.roundColor = function(j) {
                var k = i.cacheStepsPerColorChannel;
                var l = e.hex2rgb(j);
                l[0] = Math.min(255, (l[0] / k) * k);
                l[1] = Math.min(255, (l[1] / k) * k);
                l[2] = Math.min(255, (l[2] / k) * k);
                return e.rgb2hex(l)
            }
            ;
            i.cacheStepsPerColorChannel = 8;
            i.convertTintToImage = false;
            i.canUseMultiply = e.canUseNewCanvasBlendModes();
            i.tintMethod = i.canUseMultiply ? i.tintWithMultiply : i.tintWithPerPixel
        }
        , {
            "../../../utils": 74
        }],
        47: [function(h, g, i) {
            var r = h("../SystemRenderer")
              , m = h("./managers/ShaderManager")
              , e = h("./managers/MaskManager")
              , l = h("./managers/StencilManager")
              , j = h("./managers/FilterManager")
              , k = h("./managers/BlendModeManager")
              , f = h("./utils/RenderTarget")
              , q = h("./utils/ObjectRenderer")
              , o = h("./filters/FXAAFilter")
              , p = h("../../utils")
              , s = h("../../const");
            function n(v, t, u) {
                u = u || {};
                r.call(this, "WebGL", v, t, u);
                this.type = s.RENDERER_TYPE.WEBGL;
                this.handleContextLost = this.handleContextLost.bind(this);
                this.handleContextRestored = this.handleContextRestored.bind(this);
                this.view.addEventListener("webglcontextlost", this.handleContextLost, false);
                this.view.addEventListener("webglcontextrestored", this.handleContextRestored, false);
                this._useFXAA = !!u.forceFXAA && u.antialias;
                this._FXAAFilter = null;
                this._contextOptions = {
                    alpha: this.transparent,
                    antialias: u.antialias,
                    premultipliedAlpha: this.transparent && this.transparent !== "notMultiplied",
                    stencil: true,
                    preserveDrawingBuffer: u.preserveDrawingBuffer
                };
                this.drawCount = 0;
                this.shaderManager = new m(this);
                this.maskManager = new e(this);
                this.stencilManager = new l(this);
                this.filterManager = new j(this);
                this.blendModeManager = new k(this);
                this.currentRenderTarget = null;
                this.currentRenderer = new q(this);
                this.initPlugins();
                this._initContext();
                this._mapBlendModes();
                this._renderTargetStack = []
            }
            n.prototype = Object.create(r.prototype);
            n.prototype.constructor = n;
            g.exports = n;
            p.pluginTarget.mixin(n);
            n.glContextId = 0;
            n.prototype._initContext = function() {
                var t = this.view.getContext("webgl", this._contextOptions) || this.view.getContext("experimental-webgl", this._contextOptions);
                this.gl = t;
                if (!t) {
                    throw new Error("This browser does not support webGL. Try using the canvas renderer")
                }
                this.glContextId = n.glContextId++;
                t.id = this.glContextId;
                t.renderer = this;
                t.disable(t.DEPTH_TEST);
                t.disable(t.CULL_FACE);
                t.enable(t.BLEND);
                this.renderTarget = new f(this.gl,this.width,this.height,null,this.resolution,true);
                this.setRenderTarget(this.renderTarget);
                this.emit("context", t);
                this.resize(this.width, this.height);
                if (!this._useFXAA) {
                    this._useFXAA = (this._contextOptions.antialias && !t.getContextAttributes().antialias)
                }
                if (this._useFXAA) {
                    window.console.warn("FXAA antialiasing being used instead of native antialiasing");
                    this._FXAAFilter = [new o()]
                }
            }
            ;
            n.prototype.render = function(t) {
                if (this.gl.isContextLost()) {
                    return
                }
                this.drawCount = 0;
                this._lastObjectRendered = t;
                if (this._useFXAA) {
                    this._FXAAFilter[0].uniforms.resolution.value.x = this.width;
                    this._FXAAFilter[0].uniforms.resolution.value.y = this.height;
                    t.filterArea = this.renderTarget.size;
                    t.filters = this._FXAAFilter
                }
                var u = t.parent;
                t.parent = this._tempDisplayObjectParent;
                t.updateTransform();
                t.parent = u;
                var v = this.gl;
                this.setRenderTarget(this.renderTarget);
                if (this.clearBeforeRender) {
                    if (this.transparent) {
                        v.clearColor(0, 0, 0, 0)
                    } else {
                        v.clearColor(this._backgroundColorRgb[0], this._backgroundColorRgb[1], this._backgroundColorRgb[2], 1)
                    }
                    v.clear(v.COLOR_BUFFER_BIT)
                }
                this.renderDisplayObject(t, this.renderTarget)
            }
            ;
            n.prototype.renderDisplayObject = function(v, u, t) {
                this.setRenderTarget(u);
                if (t) {
                    u.clear()
                }
                this.filterManager.setFilterStack(u.filterStack);
                v.renderWebGL(this);
                this.currentRenderer.flush()
            }
            ;
            n.prototype.setObjectRenderer = function(t) {
                if (this.currentRenderer === t) {
                    return
                }
                this.currentRenderer.stop();
                this.currentRenderer = t;
                this.currentRenderer.start()
            }
            ;
            n.prototype.setRenderTarget = function(t) {
                if (this.currentRenderTarget === t) {
                    return
                }
                this.currentRenderTarget = t;
                this.currentRenderTarget.activate();
                this.stencilManager.setMaskStack(t.stencilMaskStack)
            }
            ;
            n.prototype.resize = function(u, t) {
                r.prototype.resize.call(this, u, t);
                this.gl.viewport(0, 0, this.width, this.height);
                this.filterManager.resize(u, t);
                this.renderTarget.resize(u, t);
                if (this.currentRenderTarget === this.renderTarget) {
                    this.renderTarget.activate()
                }
            }
            ;
            n.prototype.updateTexture = function(t) {
                t = t.baseTexture || t;
                if (!t.hasLoaded) {
                    return
                }
                var u = this.gl;
                if (!t._glTextures[u.id]) {
                    t._glTextures[u.id] = u.createTexture();
                    t.on("update", this.updateTexture, this);
                    t.on("dispose", this.destroyTexture, this)
                }
                u.bindTexture(u.TEXTURE_2D, t._glTextures[u.id]);
                u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha);
                u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, u.RGBA, u.UNSIGNED_BYTE, t.source);
                u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, t.scaleMode === s.SCALE_MODES.LINEAR ? u.LINEAR : u.NEAREST);
                if (t.mipmap && t.isPowerOfTwo) {
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, t.scaleMode === s.SCALE_MODES.LINEAR ? u.LINEAR_MIPMAP_LINEAR : u.NEAREST_MIPMAP_NEAREST);
                    u.generateMipmap(u.TEXTURE_2D)
                } else {
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, t.scaleMode === s.SCALE_MODES.LINEAR ? u.LINEAR : u.NEAREST)
                }
                if (!t.isPowerOfTwo) {
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE)
                } else {
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.REPEAT);
                    u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.REPEAT)
                }
                return t._glTextures[u.id]
            }
            ;
            n.prototype.destroyTexture = function(t) {
                t = t.baseTexture || t;
                if (!t.hasLoaded) {
                    return
                }
                if (t._glTextures[this.gl.id]) {
                    this.gl.deleteTexture(t._glTextures[this.gl.id])
                }
            }
            ;
            n.prototype.handleContextLost = function(t) {
                t.preventDefault()
            }
            ;
            n.prototype.handleContextRestored = function() {
                this._initContext();
                for (var t in p.BaseTextureCache) {
                    p.BaseTextureCache[t]._glTextures.length = 0
                }
            }
            ;
            n.prototype.destroy = function(t) {
                this.destroyPlugins();
                this.view.removeEventListener("webglcontextlost", this.handleContextLost);
                this.view.removeEventListener("webglcontextrestored", this.handleContextRestored);
                r.prototype.destroy.call(this, t);
                this.uuid = 0;
                this.shaderManager.destroy();
                this.maskManager.destroy();
                this.stencilManager.destroy();
                this.filterManager.destroy();
                this.shaderManager = null;
                this.maskManager = null;
                this.filterManager = null;
                this.blendModeManager = null;
                this.handleContextLost = null;
                this.handleContextRestored = null;
                this._contextOptions = null;
                this.drawCount = 0;
                this.gl = null
            }
            ;
            n.prototype._mapBlendModes = function() {
                var t = this.gl;
                if (!this.blendModes) {
                    this.blendModes = {};
                    this.blendModes[s.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.ADD] = [t.SRC_ALPHA, t.DST_ALPHA];
                    this.blendModes[s.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.SCREEN] = [t.SRC_ALPHA, t.ONE];
                    this.blendModes[s.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA];
                    this.blendModes[s.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]
                }
            }
        }
        , {
            "../../const": 21,
            "../../utils": 74,
            "../SystemRenderer": 41,
            "./filters/FXAAFilter": 49,
            "./managers/BlendModeManager": 51,
            "./managers/FilterManager": 52,
            "./managers/MaskManager": 53,
            "./managers/ShaderManager": 54,
            "./managers/StencilManager": 55,
            "./utils/ObjectRenderer": 61,
            "./utils/RenderTarget": 63
        }],
        48: [function(f, g, e) {
            var i = f("../shaders/TextureShader");
            function h(k, l, j) {
                this.shaders = [];
                this.padding = 0;
                this.uniforms = j || {};
                this.vertexSrc = k || i.defaultVertexSrc;
                this.fragmentSrc = l || i.defaultFragmentSrc
            }
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.getShader = function(k) {
                var l = k.gl;
                var j = this.shaders[l.id];
                if (!j) {
                    j = new i(k.shaderManager,this.vertexSrc,this.fragmentSrc,this.uniforms,this.attributes);
                    this.shaders[l.id] = j
                }
                return j
            }
            ;
            h.prototype.applyFilter = function(n, l, k, j) {
                var m = this.getShader(n);
                n.filterManager.applyFilter(m, l, k, j)
            }
            ;
            h.prototype.syncUniform = function(k) {
                for (var m = 0, l = this.shaders.length; m < l; ++m) {
                    this.shaders[m].syncUniform(k)
                }
            }
        }
        , {
            "../shaders/TextureShader": 60
        }],
        49: [function(f, g, e) {
            var h = f("./AbstractFilter");
            function i() {
                h.call(this, "\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n", 'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n', {
                    resolution: {
                        type: "v2",
                        value: {
                            x: 1,
                            y: 1
                        }
                    }
                })
            }
            i.prototype = Object.create(h.prototype);
            i.prototype.constructor = i;
            g.exports = i;
            i.prototype.applyFilter = function(n, l, k) {
                var j = n.filterManager;
                var m = this.getShader(n);
                j.applyFilter(m, l, k)
            }
        }
        , {
            "./AbstractFilter": 48
        }],
        50: [function(g, h, f) {
            var i = g("./AbstractFilter")
              , j = g("../../../math");
            function e(k) {
                var l = new j.Matrix();
                i.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n", {
                    mask: {
                        type: "sampler2D",
                        value: k._texture
                    },
                    alpha: {
                        type: "f",
                        value: 1
                    },
                    otherMatrix: {
                        type: "mat3",
                        value: l.toArray(true)
                    }
                });
                this.maskSprite = k;
                this.maskMatrix = l
            }
            e.prototype = Object.create(i.prototype);
            e.prototype.constructor = e;
            h.exports = e;
            e.prototype.applyFilter = function(o, m, l) {
                var k = o.filterManager;
                this.uniforms.mask.value = this.maskSprite._texture;
                k.calculateMappedMatrix(m.frame, this.maskSprite, this.maskMatrix);
                this.uniforms.otherMatrix.value = this.maskMatrix.toArray(true);
                this.uniforms.alpha.value = this.maskSprite.worldAlpha;
                var n = this.getShader(o);
                k.applyFilter(n, m, l)
            }
            ;
            Object.defineProperties(e.prototype, {
                map: {
                    get: function() {
                        return this.uniforms.mask.value
                    },
                    set: function(k) {
                        this.uniforms.mask.value = k
                    }
                },
                offset: {
                    get: function() {
                        return this.uniforms.offset.value
                    },
                    set: function(k) {
                        this.uniforms.offset.value = k
                    }
                }
            })
        }
        , {
            "../../../math": 31,
            "./AbstractFilter": 48
        }],
        51: [function(g, h, f) {
            var i = g("./WebGLManager");
            function e(j) {
                i.call(this, j);
                this.currentBlendMode = 99999
            }
            e.prototype = Object.create(i.prototype);
            e.prototype.constructor = e;
            h.exports = e;
            e.prototype.setBlendMode = function(j) {
                if (this.currentBlendMode === j) {
                    return false
                }
                this.currentBlendMode = j;
                var k = this.renderer.blendModes[this.currentBlendMode];
                this.renderer.gl.blendFunc(k[0], k[1]);
                return true
            }
        }
        , {
            "./WebGLManager": 56
        }],
        52: [function(h, f, i) {
            var l = h("./WebGLManager")
              , e = h("../utils/RenderTarget")
              , m = h("../../../const")
              , g = h("../utils/Quad")
              , k = h("../../../math");
            function j(n) {
                l.call(this, n);
                this.filterStack = [];
                this.filterStack.push({
                    renderTarget: n.currentRenderTarget,
                    filter: [],
                    bounds: null
                });
                this.texturePool = [];
                this.textureSize = new k.Rectangle(0,0,n.width,n.height);
                this.currentFrame = null
            }
            j.prototype = Object.create(l.prototype);
            j.prototype.constructor = j;
            f.exports = j;
            j.prototype.onContextChange = function() {
                this.texturePool.length = 0;
                var n = this.renderer.gl;
                this.quad = new g(n)
            }
            ;
            j.prototype.setFilterStack = function(n) {
                this.filterStack = n
            }
            ;
            j.prototype.pushFilter = function(s, q) {
                var p = s.filterArea ? s.filterArea.clone() : s.getBounds();
                p.x = p.x | 0;
                p.y = p.y | 0;
                p.width = p.width | 0;
                p.height = p.height | 0;
                var r = q[0].padding | 0;
                p.x -= r;
                p.y -= r;
                p.width += r * 2;
                p.height += r * 2;
                if (this.renderer.currentRenderTarget.transform) {
                    var n = this.renderer.currentRenderTarget.transform;
                    p.x += n.tx;
                    p.y += n.ty;
                    this.capFilterArea(p);
                    p.x -= n.tx;
                    p.y -= n.ty
                } else {
                    this.capFilterArea(p)
                }
                if (p.width > 0 && p.height > 0) {
                    this.currentFrame = p;
                    var o = this.getRenderTarget();
                    this.renderer.setRenderTarget(o);
                    o.clear();
                    this.filterStack.push({
                        renderTarget: o,
                        filter: q
                    })
                } else {
                    this.filterStack.push({
                        renderTarget: null,
                        filter: q
                    })
                }
            }
            ;
            j.prototype.popFilter = function() {
                var u = this.filterStack.pop();
                var t = this.filterStack[this.filterStack.length - 1];
                var v = u.renderTarget;
                if (!u.renderTarget) {
                    return
                }
                var p = t.renderTarget;
                var s = this.renderer.gl;
                this.currentFrame = v.frame;
                this.quad.map(this.textureSize, v.frame);
                s.bindBuffer(s.ARRAY_BUFFER, this.quad.vertexBuffer);
                s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, this.quad.indexBuffer);
                var o = u.filter;
                s.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition, 2, s.FLOAT, false, 0, 0);
                s.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord, 2, s.FLOAT, false, 0, 2 * 4 * 4);
                s.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor, 4, s.FLOAT, false, 0, 4 * 4 * 4);
                this.renderer.blendModeManager.setBlendMode(m.BLEND_MODES.NORMAL);
                if (o.length === 1) {
                    if (o[0].uniforms.dimensions) {
                        o[0].uniforms.dimensions.value[0] = this.renderer.width;
                        o[0].uniforms.dimensions.value[1] = this.renderer.height;
                        o[0].uniforms.dimensions.value[2] = this.quad.vertices[0];
                        o[0].uniforms.dimensions.value[3] = this.quad.vertices[5]
                    }
                    o[0].applyFilter(this.renderer, v, p);
                    this.returnRenderTarget(v)
                } else {
                    var q = v;
                    var w = this.getRenderTarget(true);
                    for (var r = 0; r < o.length - 1; r++) {
                        var n = o[r];
                        if (n.uniforms.dimensions) {
                            n.uniforms.dimensions.value[0] = this.renderer.width;
                            n.uniforms.dimensions.value[1] = this.renderer.height;
                            n.uniforms.dimensions.value[2] = this.quad.vertices[0];
                            n.uniforms.dimensions.value[3] = this.quad.vertices[5]
                        }
                        n.applyFilter(this.renderer, q, w);
                        var x = q;
                        q = w;
                        w = x
                    }
                    o[o.length - 1].applyFilter(this.renderer, q, p);
                    this.returnRenderTarget(q);
                    this.returnRenderTarget(w)
                }
                return u.filter
            }
            ;
            j.prototype.getRenderTarget = function(n) {
                var o = this.texturePool.pop() || new e(this.renderer.gl,this.textureSize.width,this.textureSize.height,m.SCALE_MODES.LINEAR,this.renderer.resolution * m.FILTER_RESOLUTION);
                o.frame = this.currentFrame;
                if (n) {
                    o.clear(true)
                }
                return o
            }
            ;
            j.prototype.returnRenderTarget = function(n) {
                this.texturePool.push(n)
            }
            ;
            j.prototype.applyFilter = function(p, o, r, n) {
                var q = this.renderer.gl;
                this.renderer.setRenderTarget(r);
                if (n) {
                    r.clear()
                }
                this.renderer.shaderManager.setShader(p);
                p.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(true);
                p.syncUniforms();
                q.activeTexture(q.TEXTURE0);
                q.bindTexture(q.TEXTURE_2D, o.texture);
                q.drawElements(q.TRIANGLES, 6, q.UNSIGNED_SHORT, 0)
            }
            ;
            j.prototype.calculateMappedMatrix = function(q, v, r) {
                var n = v.worldTransform.copy(k.Matrix.TEMP_MATRIX)
                  , s = v._texture.baseTexture;
                var u = r.identity();
                var t = this.textureSize.height / this.textureSize.width;
                u.translate(q.x / this.textureSize.width, q.y / this.textureSize.height);
                u.scale(1, t);
                var p = (this.textureSize.width / s.width);
                var o = (this.textureSize.height / s.height);
                n.tx /= s.width * p;
                n.ty /= s.width * p;
                n.invert();
                u.prepend(n);
                u.scale(1, 1 / t);
                u.scale(p, o);
                u.translate(v.anchor.x, v.anchor.y);
                return u
            }
            ;
            j.prototype.capFilterArea = function(n) {
                if (n.x < 0) {
                    n.width += n.x;
                    n.x = 0
                }
                if (n.y < 0) {
                    n.height += n.y;
                    n.y = 0
                }
                if (n.x + n.width > this.textureSize.width) {
                    n.width = this.textureSize.width - n.x
                }
                if (n.y + n.height > this.textureSize.height) {
                    n.height = this.textureSize.height - n.y
                }
            }
            ;
            j.prototype.resize = function(p, n) {
                this.textureSize.width = p;
                this.textureSize.height = n;
                for (var o = 0; o < this.texturePool.length; o++) {
                    this.texturePool[o].resize(p, n)
                }
            }
            ;
            j.prototype.destroy = function() {
                this.filterStack = null;
                this.offsetY = 0;
                for (var n = 0; n < this.texturePool.length; n++) {
                    this.texturePool[n].destroy()
                }
                this.texturePool = null
            }
        }
        , {
            "../../../const": 21,
            "../../../math": 31,
            "../utils/Quad": 62,
            "../utils/RenderTarget": 63,
            "./WebGLManager": 56
        }],
        53: [function(f, h, e) {
            var i = f("./WebGLManager")
              , g = f("../filters/SpriteMaskFilter");
            function j(k) {
                i.call(this, k);
                this.stencilStack = [];
                this.reverse = true;
                this.count = 0;
                this.alphaMaskPool = []
            }
            j.prototype = Object.create(i.prototype);
            j.prototype.constructor = j;
            h.exports = j;
            j.prototype.pushMask = function(l, k) {
                if (k.texture) {
                    this.pushSpriteMask(l, k)
                } else {
                    this.pushStencilMask(l, k)
                }
            }
            ;
            j.prototype.popMask = function(l, k) {
                if (k.texture) {
                    this.popSpriteMask(l, k)
                } else {
                    this.popStencilMask(l, k)
                }
            }
            ;
            j.prototype.pushSpriteMask = function(m, l) {
                var k = this.alphaMaskPool.pop();
                if (!k) {
                    k = [new g(l)]
                }
                k[0].maskSprite = l;
                this.renderer.filterManager.pushFilter(m, k)
            }
            ;
            j.prototype.popSpriteMask = function() {
                var k = this.renderer.filterManager.popFilter();
                this.alphaMaskPool.push(k)
            }
            ;
            j.prototype.pushStencilMask = function(l, k) {
                this.renderer.stencilManager.pushMask(k)
            }
            ;
            j.prototype.popStencilMask = function(l, k) {
                this.renderer.stencilManager.popMask(k)
            }
        }
        , {
            "../filters/SpriteMaskFilter": 50,
            "./WebGLManager": 56
        }],
        54: [function(f, e, g) {
            var k = f("./WebGLManager")
              , h = f("../shaders/TextureShader")
              , m = f("../shaders/ComplexPrimitiveShader")
              , j = f("../shaders/PrimitiveShader")
              , l = f("../../../utils");
            function i(o) {
                k.call(this, o);
                this.maxAttibs = 10;
                this.attribState = [];
                this.tempAttribState = [];
                for (var n = 0; n < this.maxAttibs; n++) {
                    this.attribState[n] = false
                }
                this.stack = [];
                this._currentId = -1;
                this.currentShader = null
            }
            i.prototype = Object.create(k.prototype);
            i.prototype.constructor = i;
            l.pluginTarget.mixin(i);
            e.exports = i;
            i.prototype.onContextChange = function() {
                this.initPlugins();
                var o = this.renderer.gl;
                this.maxAttibs = o.getParameter(o.MAX_VERTEX_ATTRIBS);
                this.attribState = [];
                for (var n = 0; n < this.maxAttibs; n++) {
                    this.attribState[n] = false
                }
                this.defaultShader = new h(this);
                this.primitiveShader = new j(this);
                this.complexPrimitiveShader = new m(this)
            }
            ;
            i.prototype.setAttribs = function(q) {
                var o;
                for (o = 0; o < this.tempAttribState.length; o++) {
                    this.tempAttribState[o] = false
                }
                for (var n in q) {
                    this.tempAttribState[q[n]] = true
                }
                var p = this.renderer.gl;
                for (o = 0; o < this.attribState.length; o++) {
                    if (this.attribState[o] !== this.tempAttribState[o]) {
                        this.attribState[o] = this.tempAttribState[o];
                        if (this.attribState[o]) {
                            p.enableVertexAttribArray(o)
                        } else {
                            p.disableVertexAttribArray(o)
                        }
                    }
                }
            }
            ;
            i.prototype.setShader = function(n) {
                if (this._currentId === n.uuid) {
                    return false
                }
                this._currentId = n.uuid;
                this.currentShader = n;
                this.renderer.gl.useProgram(n.program);
                this.setAttribs(n.attributes);
                return true
            }
            ;
            i.prototype.destroy = function() {
                k.prototype.destroy.call(this);
                this.destroyPlugins();
                this.attribState = null;
                this.tempAttribState = null
            }
        }
        , {
            "../../../utils": 74,
            "../shaders/ComplexPrimitiveShader": 57,
            "../shaders/PrimitiveShader": 58,
            "../shaders/TextureShader": 60,
            "./WebGLManager": 56
        }],
        55: [function(g, h, f) {
            var i = g("./WebGLManager")
              , e = g("../../../utils");
            function j(k) {
                i.call(this, k);
                this.stencilMaskStack = null
            }
            j.prototype = Object.create(i.prototype);
            j.prototype.constructor = j;
            h.exports = j;
            j.prototype.setMaskStack = function(l) {
                this.stencilMaskStack = l;
                var k = this.renderer.gl;
                if (l.stencilStack.length === 0) {
                    k.disable(k.STENCIL_TEST)
                } else {
                    k.enable(k.STENCIL_TEST)
                }
            }
            ;
            j.prototype.pushStencil = function(k, n) {
                this.renderer.currentRenderTarget.attachStencilBuffer();
                var m = this.renderer.gl
                  , l = this.stencilMaskStack;
                this.bindGraphics(k, n, this.renderer);
                if (l.stencilStack.length === 0) {
                    m.enable(m.STENCIL_TEST);
                    m.clear(m.STENCIL_BUFFER_BIT);
                    l.reverse = true;
                    l.count = 0
                }
                l.stencilStack.push(n);
                var o = l.count;
                m.colorMask(false, false, false, false);
                m.stencilFunc(m.ALWAYS, 0, 255);
                m.stencilOp(m.KEEP, m.KEEP, m.INVERT);
                if (n.mode === 1) {
                    m.drawElements(m.TRIANGLE_FAN, n.indices.length - 4, m.UNSIGNED_SHORT, 0);
                    if (l.reverse) {
                        m.stencilFunc(m.EQUAL, 255 - o, 255);
                        m.stencilOp(m.KEEP, m.KEEP, m.DECR)
                    } else {
                        m.stencilFunc(m.EQUAL, o, 255);
                        m.stencilOp(m.KEEP, m.KEEP, m.INCR)
                    }
                    m.drawElements(m.TRIANGLE_FAN, 4, m.UNSIGNED_SHORT, (n.indices.length - 4) * 2);
                    if (l.reverse) {
                        m.stencilFunc(m.EQUAL, 255 - (o + 1), 255)
                    } else {
                        m.stencilFunc(m.EQUAL, o + 1, 255)
                    }
                    l.reverse = !l.reverse
                } else {
                    if (!l.reverse) {
                        m.stencilFunc(m.EQUAL, 255 - o, 255);
                        m.stencilOp(m.KEEP, m.KEEP, m.DECR)
                    } else {
                        m.stencilFunc(m.EQUAL, o, 255);
                        m.stencilOp(m.KEEP, m.KEEP, m.INCR)
                    }
                    m.drawElements(m.TRIANGLE_STRIP, n.indices.length, m.UNSIGNED_SHORT, 0);
                    if (!l.reverse) {
                        m.stencilFunc(m.EQUAL, 255 - (o + 1), 255)
                    } else {
                        m.stencilFunc(m.EQUAL, o + 1, 255)
                    }
                }
                m.colorMask(true, true, true, true);
                m.stencilOp(m.KEEP, m.KEEP, m.KEEP);
                l.count++
            }
            ;
            j.prototype.bindGraphics = function(k, n) {
                this._currentGraphics = k;
                var m = this.renderer.gl;
                var l;
                if (n.mode === 1) {
                    l = this.renderer.shaderManager.complexPrimitiveShader;
                    this.renderer.shaderManager.setShader(l);
                    m.uniformMatrix3fv(l.uniforms.translationMatrix._location, false, k.worldTransform.toArray(true));
                    m.uniformMatrix3fv(l.uniforms.projectionMatrix._location, false, this.renderer.currentRenderTarget.projectionMatrix.toArray(true));
                    m.uniform3fv(l.uniforms.tint._location, e.hex2rgb(k.tint));
                    m.uniform3fv(l.uniforms.color._location, n.color);
                    m.uniform1f(l.uniforms.alpha._location, k.worldAlpha);
                    m.bindBuffer(m.ARRAY_BUFFER, n.buffer);
                    m.vertexAttribPointer(l.attributes.aVertexPosition, 2, m.FLOAT, false, 4 * 2, 0);
                    m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, n.indexBuffer)
                } else {
                    l = this.renderer.shaderManager.primitiveShader;
                    this.renderer.shaderManager.setShader(l);
                    m.uniformMatrix3fv(l.uniforms.translationMatrix._location, false, k.worldTransform.toArray(true));
                    m.uniformMatrix3fv(l.uniforms.projectionMatrix._location, false, this.renderer.currentRenderTarget.projectionMatrix.toArray(true));
                    m.uniform3fv(l.uniforms.tint._location, e.hex2rgb(k.tint));
                    m.uniform1f(l.uniforms.alpha._location, k.worldAlpha);
                    m.bindBuffer(m.ARRAY_BUFFER, n.buffer);
                    m.vertexAttribPointer(l.attributes.aVertexPosition, 2, m.FLOAT, false, 4 * 6, 0);
                    m.vertexAttribPointer(l.attributes.aColor, 4, m.FLOAT, false, 4 * 6, 2 * 4);
                    m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, n.indexBuffer)
                }
            }
            ;
            j.prototype.popStencil = function(k, n) {
                var m = this.renderer.gl
                  , l = this.stencilMaskStack;
                l.stencilStack.pop();
                l.count--;
                if (l.stencilStack.length === 0) {
                    m.disable(m.STENCIL_TEST)
                } else {
                    var o = l.count;
                    this.bindGraphics(k, n, this.renderer);
                    m.colorMask(false, false, false, false);
                    if (n.mode === 1) {
                        l.reverse = !l.reverse;
                        if (l.reverse) {
                            m.stencilFunc(m.EQUAL, 255 - (o + 1), 255);
                            m.stencilOp(m.KEEP, m.KEEP, m.INCR)
                        } else {
                            m.stencilFunc(m.EQUAL, o + 1, 255);
                            m.stencilOp(m.KEEP, m.KEEP, m.DECR)
                        }
                        m.drawElements(m.TRIANGLE_FAN, 4, m.UNSIGNED_SHORT, (n.indices.length - 4) * 2);
                        m.stencilFunc(m.ALWAYS, 0, 255);
                        m.stencilOp(m.KEEP, m.KEEP, m.INVERT);
                        m.drawElements(m.TRIANGLE_FAN, n.indices.length - 4, m.UNSIGNED_SHORT, 0);
                        if (!l.reverse) {
                            m.stencilFunc(m.EQUAL, 255 - (o), 255)
                        } else {
                            m.stencilFunc(m.EQUAL, o, 255)
                        }
                    } else {
                        if (!l.reverse) {
                            m.stencilFunc(m.EQUAL, 255 - (o + 1), 255);
                            m.stencilOp(m.KEEP, m.KEEP, m.INCR)
                        } else {
                            m.stencilFunc(m.EQUAL, o + 1, 255);
                            m.stencilOp(m.KEEP, m.KEEP, m.DECR)
                        }
                        m.drawElements(m.TRIANGLE_STRIP, n.indices.length, m.UNSIGNED_SHORT, 0);
                        if (!l.reverse) {
                            m.stencilFunc(m.EQUAL, 255 - (o), 255)
                        } else {
                            m.stencilFunc(m.EQUAL, o, 255)
                        }
                    }
                    m.colorMask(true, true, true, true);
                    m.stencilOp(m.KEEP, m.KEEP, m.KEEP)
                }
            }
            ;
            j.prototype.destroy = function() {
                i.prototype.destroy.call(this);
                this.stencilMaskStack.stencilStack = null
            }
            ;
            j.prototype.pushMask = function(k) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                if (k.dirty) {
                    this.renderer.plugins.graphics.updateGraphics(k, this.renderer.gl)
                }
                if (!k._webGL[this.renderer.gl.id].data.length) {
                    return
                }
                this.pushStencil(k, k._webGL[this.renderer.gl.id].data[0], this.renderer)
            }
            ;
            j.prototype.popMask = function(k) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics);
                this.popStencil(k, k._webGL[this.renderer.gl.id].data[0], this.renderer)
            }
        }
        , {
            "../../../utils": 74,
            "./WebGLManager": 56
        }],
        56: [function(f, g, e) {
            function h(i) {
                this.renderer = i;
                this.renderer.on("context", this.onContextChange, this)
            }
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.onContextChange = function() {}
            ;
            h.prototype.destroy = function() {
                this.renderer.off("context", this.onContextChange);
                this.renderer = null
            }
        }
        , {}],
        57: [function(f, g, e) {
            var h = f("./Shader");
            function i(j) {
                h.call(this, j, ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f",
                        value: [0, 0, 0]
                    },
                    alpha: {
                        type: "1f",
                        value: 0
                    },
                    color: {
                        type: "3f",
                        value: [0, 0, 0]
                    },
                    translationMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    },
                    projectionMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    }
                }, {
                    aVertexPosition: 0
                })
            }
            i.prototype = Object.create(h.prototype);
            i.prototype.constructor = i;
            g.exports = i
        }
        , {
            "./Shader": 59
        }],
        58: [function(g, h, f) {
            var i = g("./Shader");
            function e(j) {
                i.call(this, j, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f",
                        value: [0, 0, 0]
                    },
                    alpha: {
                        type: "1f",
                        value: 0
                    },
                    translationMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    },
                    projectionMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    }
                }, {
                    aVertexPosition: 0,
                    aColor: 0
                })
            }
            e.prototype = Object.create(i.prototype);
            e.prototype.constructor = e;
            h.exports = e
        }
        , {
            "./Shader": 59
        }],
        59: [function(g, h, f) {
            var e = g("../../../utils");
            function i(n, k, m, j, l) {
                if (!k || !m) {
                    throw new Error("Pixi.js Error. Shader requires vertexSrc and fragmentSrc")
                }
                this.uuid = e.uuid();
                this.gl = n.renderer.gl;
                this.shaderManager = n;
                this.program = null;
                this.uniforms = j || {};
                this.attributes = l || {};
                this.textureCount = 1;
                this.vertexSrc = k;
                this.fragmentSrc = m;
                this.init()
            }
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.init = function() {
                this.compile();
                this.gl.useProgram(this.program);
                this.cacheUniformLocations(Object.keys(this.uniforms));
                this.cacheAttributeLocations(Object.keys(this.attributes))
            }
            ;
            i.prototype.cacheUniformLocations = function(k) {
                for (var j = 0; j < k.length; ++j) {
                    this.uniforms[k[j]]._location = this.gl.getUniformLocation(this.program, k[j])
                }
            }
            ;
            i.prototype.cacheAttributeLocations = function(k) {
                for (var j = 0; j < k.length; ++j) {
                    this.attributes[k[j]] = this.gl.getAttribLocation(this.program, k[j])
                }
            }
            ;
            i.prototype.compile = function() {
                var m = this.gl;
                var k = this._glCompile(m.VERTEX_SHADER, this.vertexSrc);
                var l = this._glCompile(m.FRAGMENT_SHADER, this.fragmentSrc);
                var j = m.createProgram();
                m.attachShader(j, k);
                m.attachShader(j, l);
                m.linkProgram(j);
                if (!m.getProgramParameter(j, m.LINK_STATUS)) {
                    console.error("Pixi.js Error: Could not initialize shader.");
                    console.error("gl.VALIDATE_STATUS", m.getProgramParameter(j, m.VALIDATE_STATUS));
                    console.error("gl.getError()", m.getError());
                    if (m.getProgramInfoLog(j) !== "") {
                        console.warn("Pixi.js Warning: gl.getProgramInfoLog()", m.getProgramInfoLog(j))
                    }
                    m.deleteProgram(j);
                    j = null
                }
                m.deleteShader(k);
                m.deleteShader(l);
                return (this.program = j)
            }
            ;
            i.prototype.syncUniform = function(j) {
                var k = j._location, o = j.value, p = this.gl, m, l;
                switch (j.type) {
                case "i":
                case "1i":
                    p.uniform1i(k, o);
                    break;
                case "f":
                case "1f":
                    p.uniform1f(k, o);
                    break;
                case "2f":
                    p.uniform2f(k, o[0], o[1]);
                    break;
                case "3f":
                    p.uniform3f(k, o[0], o[1], o[2]);
                    break;
                case "4f":
                    p.uniform4f(k, o[0], o[1], o[2], o[3]);
                    break;
                case "v2":
                    p.uniform2f(k, o.x, o.y);
                    break;
                case "v3":
                    p.uniform3f(k, o.x, o.y, o.z);
                    break;
                case "v4":
                    p.uniform4f(k, o.x, o.y, o.z, o.w);
                    break;
                case "1iv":
                    p.uniform1iv(k, o);
                    break;
                case "2iv":
                    p.uniform2iv(k, o);
                    break;
                case "3iv":
                    p.uniform3iv(k, o);
                    break;
                case "4iv":
                    p.uniform4iv(k, o);
                    break;
                case "1fv":
                    p.uniform1fv(k, o);
                    break;
                case "2fv":
                    p.uniform2fv(k, o);
                    break;
                case "3fv":
                    p.uniform3fv(k, o);
                    break;
                case "4fv":
                    p.uniform4fv(k, o);
                    break;
                case "m2":
                case "mat2":
                case "Matrix2fv":
                    p.uniformMatrix2fv(k, j.transpose, o);
                    break;
                case "m3":
                case "mat3":
                case "Matrix3fv":
                    p.uniformMatrix3fv(k, j.transpose, o);
                    break;
                case "m4":
                case "mat4":
                case "Matrix4fv":
                    p.uniformMatrix4fv(k, j.transpose, o);
                    break;
                case "c":
                    if (typeof o === "number") {
                        o = e.hex2rgb(o)
                    }
                    p.uniform3f(k, o[0], o[1], o[2]);
                    break;
                case "iv1":
                    p.uniform1iv(k, o);
                    break;
                case "iv":
                    p.uniform3iv(k, o);
                    break;
                case "fv1":
                    p.uniform1fv(k, o);
                    break;
                case "fv":
                    p.uniform3fv(k, o);
                    break;
                case "v2v":
                    if (!j._array) {
                        j._array = new Float32Array(2 * o.length)
                    }
                    for (m = 0,
                    l = o.length; m < l; ++m) {
                        j._array[m * 2] = o[m].x;
                        j._array[m * 2 + 1] = o[m].y
                    }
                    p.uniform2fv(k, j._array);
                    break;
                case "v3v":
                    if (!j._array) {
                        j._array = new Float32Array(3 * o.length)
                    }
                    for (m = 0,
                    l = o.length; m < l; ++m) {
                        j._array[m * 3] = o[m].x;
                        j._array[m * 3 + 1] = o[m].y;
                        j._array[m * 3 + 2] = o[m].z
                    }
                    p.uniform3fv(k, j._array);
                    break;
                case "v4v":
                    if (!j._array) {
                        j._array = new Float32Array(4 * o.length)
                    }
                    for (m = 0,
                    l = o.length; m < l; ++m) {
                        j._array[m * 4] = o[m].x;
                        j._array[m * 4 + 1] = o[m].y;
                        j._array[m * 4 + 2] = o[m].z;
                        j._array[m * 4 + 3] = o[m].w
                    }
                    p.uniform4fv(k, j._array);
                    break;
                case "t":
                case "sampler2D":
                    if (!j.value || !j.value.baseTexture.hasLoaded) {
                        break
                    }
                    p.activeTexture(p["TEXTURE" + this.textureCount]);
                    var n = j.value.baseTexture._glTextures[p.id];
                    if (!n) {
                        this.initSampler2D(j)
                    }
                    p.bindTexture(p.TEXTURE_2D, n);
                    p.uniform1i(j._location, this.textureCount);
                    this.textureCount++;
                    break;
                default:
                    console.warn("Pixi.js Shader Warning: Unknown uniform type: " + j.type)
                }
            }
            ;
            i.prototype.syncUniforms = function() {
                this.textureCount = 1;
                for (var j in this.uniforms) {
                    this.syncUniform(this.uniforms[j])
                }
            }
            ;
            i.prototype.initSampler2D = function(j) {
                var m = this.gl;
                var k = j.value.baseTexture;
                if (!k.hasLoaded) {
                    return
                }
                if (j.textureData) {
                    var l = j.textureData;
                    k._glTextures[m.id] = m.createTexture();
                    m.bindTexture(m.TEXTURE_2D, k._glTextures[m.id]);
                    m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL, k.premultipliedAlpha);
                    m.texImage2D(m.TEXTURE_2D, 0, l.luminance ? m.LUMINANCE : m.RGBA, m.RGBA, m.UNSIGNED_BYTE, k.source);
                    m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MAG_FILTER, l.magFilter ? l.magFilter : m.LINEAR);
                    m.texParameteri(m.TEXTURE_2D, m.TEXTURE_MIN_FILTER, l.wrapS ? l.wrapS : m.CLAMP_TO_EDGE);
                    m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_T, l.wrapS ? l.wrapS : m.CLAMP_TO_EDGE);
                    m.texParameteri(m.TEXTURE_2D, m.TEXTURE_WRAP_S, l.wrapT ? l.wrapT : m.CLAMP_TO_EDGE)
                } else {
                    this.shaderManager.renderer.updateTexture(k)
                }
            }
            ;
            i.prototype.destroy = function() {
                this.gl.deleteProgram(this.program);
                this.gl = null;
                this.uniforms = null;
                this.attributes = null;
                this.vertexSrc = null;
                this.fragmentSrc = null
            }
            ;
            i.prototype._glCompile = function(j, l) {
                var k = this.gl.createShader(j);
                this.gl.shaderSource(k, l);
                this.gl.compileShader(k);
                if (!this.gl.getShaderParameter(k, this.gl.COMPILE_STATUS)) {
                    console.log(this.gl.getShaderInfoLog(k));
                    return null
                }
                return k
            }
        }
        , {
            "../../../utils": 74
        }],
        60: [function(g, h, e) {
            var i = g("./Shader");
            function f(m, l, r, j, o) {
                var p = {
                    uSampler: {
                        type: "sampler2D",
                        value: 0
                    },
                    projectionMatrix: {
                        type: "mat3",
                        value: new Float32Array(1,0,0,0,1,0,0,0,1)
                    }
                };
                if (j) {
                    for (var q in j) {
                        p[q] = j[q]
                    }
                }
                var k = {
                    aVertexPosition: 0,
                    aTextureCoord: 0,
                    aColor: 0
                };
                if (o) {
                    for (var n in o) {
                        k[n] = o[n]
                    }
                }
                l = l || f.defaultVertexSrc;
                r = r || f.defaultFragmentSrc;
                i.call(this, m, l, r, p, k)
            }
            f.prototype = Object.create(i.prototype);
            f.prototype.constructor = f;
            h.exports = f;
            f.defaultVertexSrc = ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n");
            f.defaultFragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"].join("\n")
        }
        , {
            "./Shader": 59
        }],
        61: [function(f, g, e) {
            var h = f("../managers/WebGLManager");
            function i(j) {
                h.call(this, j)
            }
            i.prototype = Object.create(h.prototype);
            i.prototype.constructor = i;
            g.exports = i;
            i.prototype.start = function() {}
            ;
            i.prototype.stop = function() {
                this.flush()
            }
            ;
            i.prototype.flush = function() {}
            ;
            i.prototype.render = function(j) {}
        }
        , {
            "../managers/WebGLManager": 56
        }],
        62: [function(f, g, e) {
            function h(i) {
                this.gl = i;
                this.vertices = new Float32Array([0, 0, 200, 0, 200, 200, 0, 200]);
                this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
                this.colors = new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
                this.indices = new Uint16Array([0, 1, 2, 0, 3, 2]);
                this.vertexBuffer = i.createBuffer();
                this.indexBuffer = i.createBuffer();
                i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffer);
                i.bufferData(i.ARRAY_BUFFER, (8 + 8 + 16) * 4, i.DYNAMIC_DRAW);
                i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                i.bufferData(i.ELEMENT_ARRAY_BUFFER, this.indices, i.STATIC_DRAW);
                this.upload()
            }
            h.prototype.constructor = h;
            h.prototype.map = function(k, j) {
                var i = 0;
                var l = 0;
                this.uvs[0] = i;
                this.uvs[1] = l;
                this.uvs[2] = i + j.width / k.width;
                this.uvs[3] = l;
                this.uvs[4] = i + j.width / k.width;
                this.uvs[5] = l + j.height / k.height;
                this.uvs[6] = i;
                this.uvs[7] = l + j.height / k.height;
                i = j.x;
                l = j.y;
                this.vertices[0] = i;
                this.vertices[1] = l;
                this.vertices[2] = i + j.width;
                this.vertices[3] = l;
                this.vertices[4] = i + j.width;
                this.vertices[5] = l + j.height;
                this.vertices[6] = i;
                this.vertices[7] = l + j.height;
                this.upload()
            }
            ;
            h.prototype.upload = function() {
                var i = this.gl;
                i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffer);
                i.bufferSubData(i.ARRAY_BUFFER, 0, this.vertices);
                i.bufferSubData(i.ARRAY_BUFFER, 8 * 4, this.uvs);
                i.bufferSubData(i.ARRAY_BUFFER, (8 + 8) * 4, this.colors)
            }
            ;
            g.exports = h
        }
        , {}],
        63: [function(i, j, g) {
            var k = i("../../../math")
              , f = i("../../../utils")
              , e = i("../../../const")
              , h = i("./StencilMaskStack");
            var l = function(s, r, m, q, p, o) {
                this.gl = s;
                this.frameBuffer = null;
                this.texture = null;
                this.size = new k.Rectangle(0,0,1,1);
                this.resolution = p || e.RESOLUTION;
                this.projectionMatrix = new k.Matrix();
                this.transform = null;
                this.frame = null;
                this.stencilBuffer = null;
                this.stencilMaskStack = new h();
                this.filterStack = [{
                    renderTarget: this,
                    filter: [],
                    bounds: this.size
                }];
                this.scaleMode = q || e.SCALE_MODES.DEFAULT;
                this.root = o;
                if (!this.root) {
                    this.frameBuffer = s.createFramebuffer();
                    this.texture = s.createTexture();
                    s.bindTexture(s.TEXTURE_2D, this.texture);
                    s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, q === e.SCALE_MODES.LINEAR ? s.LINEAR : s.NEAREST);
                    s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, q === e.SCALE_MODES.LINEAR ? s.LINEAR : s.NEAREST);
                    var n = f.isPowerOfTwo(r, m);
                    if (!n) {
                        s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.CLAMP_TO_EDGE);
                        s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.CLAMP_TO_EDGE)
                    } else {
                        s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, s.REPEAT);
                        s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, s.REPEAT)
                    }
                    s.bindFramebuffer(s.FRAMEBUFFER, this.frameBuffer);
                    s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.texture, 0)
                }
                this.resize(r, m)
            };
            l.prototype.constructor = l;
            j.exports = l;
            l.prototype.clear = function(n) {
                var m = this.gl;
                if (n) {
                    m.bindFramebuffer(m.FRAMEBUFFER, this.frameBuffer)
                }
                m.clearColor(0, 0, 0, 0);
                m.clear(m.COLOR_BUFFER_BIT)
            }
            ;
            l.prototype.attachStencilBuffer = function() {
                if (this.stencilBuffer) {
                    return
                }
                if (!this.root) {
                    var m = this.gl;
                    this.stencilBuffer = m.createRenderbuffer();
                    m.bindRenderbuffer(m.RENDERBUFFER, this.stencilBuffer);
                    m.framebufferRenderbuffer(m.FRAMEBUFFER, m.DEPTH_STENCIL_ATTACHMENT, m.RENDERBUFFER, this.stencilBuffer);
                    m.renderbufferStorage(m.RENDERBUFFER, m.DEPTH_STENCIL, this.size.width * this.resolution, this.size.height * this.resolution)
                }
            }
            ;
            l.prototype.activate = function() {
                var n = this.gl;
                n.bindFramebuffer(n.FRAMEBUFFER, this.frameBuffer);
                var m = this.frame || this.size;
                this.calculateProjection(m);
                if (this.transform) {
                    this.projectionMatrix.append(this.transform)
                }
                n.viewport(0, 0, m.width * this.resolution, m.height * this.resolution)
            }
            ;
            l.prototype.calculateProjection = function(m) {
                var n = this.projectionMatrix;
                n.identity();
                if (!this.root) {
                    n.a = 1 / m.width * 2;
                    n.d = 1 / m.height * 2;
                    n.tx = -1 - m.x * n.a;
                    n.ty = -1 - m.y * n.d
                } else {
                    n.a = 1 / m.width * 2;
                    n.d = -1 / m.height * 2;
                    n.tx = -1 - m.x * n.a;
                    n.ty = 1 - m.y * n.d
                }
            }
            ;
            l.prototype.resize = function(o, m) {
                o = o | 0;
                m = m | 0;
                if (this.size.width === o && this.size.height === m) {
                    return
                }
                this.size.width = o;
                this.size.height = m;
                if (!this.root) {
                    var p = this.gl;
                    p.bindTexture(p.TEXTURE_2D, this.texture);
                    p.texImage2D(p.TEXTURE_2D, 0, p.RGBA, o * this.resolution, m * this.resolution, 0, p.RGBA, p.UNSIGNED_BYTE, null);
                    if (this.stencilBuffer) {
                        p.bindRenderbuffer(p.RENDERBUFFER, this.stencilBuffer);
                        p.renderbufferStorage(p.RENDERBUFFER, p.DEPTH_STENCIL, o * this.resolution, m * this.resolution)
                    }
                }
                var n = this.frame || this.size;
                this.calculateProjection(n)
            }
            ;
            l.prototype.destroy = function() {
                var m = this.gl;
                m.deleteFramebuffer(this.frameBuffer);
                m.deleteTexture(this.texture);
                this.frameBuffer = null;
                this.texture = null
            }
        }
        , {
            "../../../const": 21,
            "../../../math": 31,
            "../../../utils": 74,
            "./StencilMaskStack": 64
        }],
        64: [function(g, h, e) {
            function f() {
                this.stencilStack = [];
                this.reverse = true;
                this.count = 0
            }
            f.prototype.constructor = f;
            h.exports = f
        }
        , {}],
        65: [function(i, h, l) {
            var m = i("../math")
              , k = i("../textures/Texture")
              , j = i("../display/Container")
              , f = i("../renderers/canvas/utils/CanvasTinter")
              , n = i("../utils")
              , o = i("../const")
              , e = new m.Point();
            function g(p) {
                j.call(this);
                this.anchor = new m.Point();
                this._texture = null;
                this._width = 0;
                this._height = 0;
                this.tint = 16777215;
                this.blendMode = o.BLEND_MODES.NORMAL;
                this.shader = null;
                this.cachedTint = 16777215;
                this.texture = p || k.EMPTY
            }
            g.prototype = Object.create(j.prototype);
            g.prototype.constructor = g;
            h.exports = g;
            Object.defineProperties(g.prototype, {
                width: {
                    get: function() {
                        return this.scale.x * this.texture._frame.width
                    },
                    set: function(p) {
                        this.scale.x = p / this.texture._frame.width;
                        this._width = p
                    }
                },
                height: {
                    get: function() {
                        return this.scale.y * this.texture._frame.height
                    },
                    set: function(p) {
                        this.scale.y = p / this.texture._frame.height;
                        this._height = p
                    }
                },
                texture: {
                    get: function() {
                        return this._texture
                    },
                    set: function(p) {
                        if (this._texture === p) {
                            return
                        }
                        this._texture = p;
                        this.cachedTint = 16777215;
                        if (p) {
                            if (p.baseTexture.hasLoaded) {
                                this._onTextureUpdate()
                            } else {
                                p.once("update", this._onTextureUpdate, this)
                            }
                        }
                    }
                }
            });
            g.prototype._onTextureUpdate = function() {
                if (this._width) {
                    this.scale.x = this._width / this.texture.frame.width
                }
                if (this._height) {
                    this.scale.y = this._height / this.texture.frame.height
                }
            }
            ;
            g.prototype._renderWebGL = function(p) {
                p.setObjectRenderer(p.plugins.sprite);
                p.plugins.sprite.render(this)
            }
            ;
            g.prototype.getBounds = function(C) {
                if (!this._currentBounds) {
                    var z = this._texture._frame.width;
                    var y = this._texture._frame.height;
                    var x = z * (1 - this.anchor.x);
                    var w = z * -this.anchor.x;
                    var v = y * (1 - this.anchor.y);
                    var u = y * -this.anchor.y;
                    var A = C || this.worldTransform;
                    var P = A.a;
                    var N = A.b;
                    var L = A.c;
                    var I = A.d;
                    var Q = A.tx;
                    var O = A.ty;
                    var M, K, J, G;
                    if (N === 0 && L === 0) {
                        if (P < 0) {
                            P *= -1
                        }
                        if (I < 0) {
                            I *= -1
                        }
                        M = P * w + Q;
                        K = P * x + Q;
                        J = I * u + O;
                        G = I * v + O
                    } else {
                        var F = P * w + L * u + Q;
                        var s = I * u + N * w + O;
                        var E = P * x + L * u + Q;
                        var r = I * u + N * x + O;
                        var D = P * x + L * v + Q;
                        var q = I * v + N * x + O;
                        var B = P * w + L * v + Q;
                        var p = I * v + N * w + O;
                        M = F;
                        M = E < M ? E : M;
                        M = D < M ? D : M;
                        M = B < M ? B : M;
                        J = s;
                        J = r < J ? r : J;
                        J = q < J ? q : J;
                        J = p < J ? p : J;
                        K = F;
                        K = E > K ? E : K;
                        K = D > K ? D : K;
                        K = B > K ? B : K;
                        G = s;
                        G = r > G ? r : G;
                        G = q > G ? q : G;
                        G = p > G ? p : G
                    }
                    if (this.children.length) {
                        var H = this.containerGetBounds();
                        x = H.x;
                        w = H.x + H.width;
                        v = H.y;
                        u = H.y + H.height;
                        M = (M < x) ? M : x;
                        J = (J < v) ? J : v;
                        K = (K > w) ? K : w;
                        G = (G > u) ? G : u
                    }
                    var t = this._bounds;
                    t.x = M;
                    t.width = K - M;
                    t.y = J;
                    t.height = G - J;
                    this._currentBounds = t
                }
                return this._currentBounds
            }
            ;
            g.prototype.getLocalBounds = function() {
                this._bounds.x = -this._texture._frame.width * this.anchor.x;
                this._bounds.y = -this._texture._frame.height * this.anchor.y;
                this._bounds.width = this._texture._frame.width;
                this._bounds.height = this._texture._frame.height;
                return this._bounds
            }
            ;
            g.prototype.containsPoint = function(q) {
                this.worldTransform.applyInverse(q, e);
                var t = this._texture._frame.width;
                var p = this._texture._frame.height;
                var r = -t * this.anchor.x;
                var s;
                if (e.x > r && e.x < r + t) {
                    s = -p * this.anchor.y;
                    if (e.y > s && e.y < s + p) {
                        return true
                    }
                }
                return false
            }
            ;
            g.prototype._renderCanvas = function(s) {
                if (this.texture.crop.width <= 0 || this.texture.crop.height <= 0) {
                    return
                }
                if (this.blendMode !== s.currentBlendMode) {
                    s.currentBlendMode = this.blendMode;
                    s.context.globalCompositeOperation = s.blendModes[s.currentBlendMode]
                }
                if (this.texture.valid) {
                    var t = this._texture, r = this.worldTransform, y, x, p, w;
                    var q = t.baseTexture.resolution / s.resolution;
                    s.context.globalAlpha = this.worldAlpha;
                    if (s.smoothProperty && s.currentScaleMode !== t.baseTexture.scaleMode) {
                        s.currentScaleMode = t.baseTexture.scaleMode;
                        s.context[s.smoothProperty] = (s.currentScaleMode === o.SCALE_MODES.LINEAR)
                    }
                    if (t.rotate) {
                        var v = r.a;
                        var u = r.b;
                        r.a = -r.c;
                        r.b = -r.d;
                        r.c = v;
                        r.d = u;
                        p = t.crop.height;
                        w = t.crop.width;
                        y = (t.trim) ? t.trim.y - this.anchor.y * t.trim.height : this.anchor.y * -t._frame.height;
                        x = (t.trim) ? t.trim.x - this.anchor.x * t.trim.width : this.anchor.x * -t._frame.width
                    } else {
                        p = t.crop.width;
                        w = t.crop.height;
                        y = (t.trim) ? t.trim.x - this.anchor.x * t.trim.width : this.anchor.x * -t._frame.width;
                        x = (t.trim) ? t.trim.y - this.anchor.y * t.trim.height : this.anchor.y * -t._frame.height
                    }
                    if (s.roundPixels) {
                        s.context.setTransform(r.a, r.b, r.c, r.d, (r.tx * s.resolution) | 0, (r.ty * s.resolution) | 0);
                        y = y | 0;
                        x = x | 0
                    } else {
                        s.context.setTransform(r.a, r.b, r.c, r.d, r.tx * s.resolution, r.ty * s.resolution)
                    }
                    if (this.tint !== 16777215) {
                        if (this.cachedTint !== this.tint) {
                            this.cachedTint = this.tint;
                            this.tintedTexture = f.getTintedTexture(this, this.tint)
                        }
                        s.context.drawImage(this.tintedTexture, 0, 0, p * q * s.resolution, w * q * s.resolution, y, x, p * s.resolution, w * s.resolution)
                    } else {
                        s.context.drawImage(t.baseTexture.source, t.crop.x * q, t.crop.y * q, p * q * s.resolution, w * q * s.resolution, y, x, p * s.resolution, w * s.resolution)
                    }
                }
            }
            ;
            g.prototype.destroy = function(p, q) {
                j.prototype.destroy.call(this);
                this.anchor = null;
                if (p) {
                    this._texture.destroy(q)
                }
                this._texture = null;
                this.shader = null
            }
            ;
            g.fromFrame = function(q) {
                var p = n.TextureCache[q];
                if (!p) {
                    throw new Error('The frameId "' + q + '" does not exist in the texture cache')
                }
                return new g(p)
            }
            ;
            g.fromImage = function(q, p, r) {
                return new g(k.fromImage(q, p, r))
            }
        }
        , {
            "../const": 21,
            "../display/Container": 22,
            "../math": 31,
            "../renderers/canvas/utils/CanvasTinter": 46,
            "../textures/Texture": 70,
            "../utils": 74
        }],
        66: [function(h, i, g) {
            var k = h("../../renderers/webgl/utils/ObjectRenderer")
              , f = h("../../renderers/webgl/WebGLRenderer")
              , e = h("../../const");
            function j(o) {
                k.call(this, o);
                this.vertSize = 5;
                this.vertByteSize = this.vertSize * 4;
                this.size = e.SPRITE_BATCH_SIZE;
                var l = this.size * 4 * this.vertByteSize;
                var p = this.size * 6;
                this.vertices = new ArrayBuffer(l);
                this.positions = new Float32Array(this.vertices);
                this.colors = new Uint32Array(this.vertices);
                this.indices = new Uint16Array(p);
                this.lastIndexCount = 0;
                for (var n = 0, m = 0; n < p; n += 6,
                m += 4) {
                    this.indices[n + 0] = m + 0;
                    this.indices[n + 1] = m + 1;
                    this.indices[n + 2] = m + 2;
                    this.indices[n + 3] = m + 0;
                    this.indices[n + 4] = m + 2;
                    this.indices[n + 5] = m + 3
                }
                this.drawing = false;
                this.currentBatchSize = 0;
                this.currentBaseTexture = null;
                this.textures = [];
                this.blendModes = [];
                this.shaders = [];
                this.sprites = [];
                this.shader = null
            }
            j.prototype = Object.create(k.prototype);
            j.prototype.constructor = j;
            i.exports = j;
            f.registerPlugin("sprite", j);
            j.prototype.onContextChange = function() {
                var l = this.renderer.gl;
                this.shader = this.renderer.shaderManager.defaultShader;
                this.vertexBuffer = l.createBuffer();
                this.indexBuffer = l.createBuffer();
                l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                l.bufferData(l.ELEMENT_ARRAY_BUFFER, this.indices, l.STATIC_DRAW);
                l.bindBuffer(l.ARRAY_BUFFER, this.vertexBuffer);
                l.bufferData(l.ARRAY_BUFFER, this.vertices, l.DYNAMIC_DRAW);
                this.currentBlendMode = 99999
            }
            ;
            j.prototype.render = function(x) {
                var w = x._texture;
                if (this.currentBatchSize >= this.size) {
                    this.flush();
                    this.currentBaseTexture = w.baseTexture
                }
                var t = w._uvs;
                if (!t) {
                    return
                }
                var m = x.anchor.x;
                var l = x.anchor.y;
                var v, u, r, q;
                if (w.trim) {
                    var z = w.trim;
                    u = z.x - m * z.width;
                    v = u + w.crop.width;
                    q = z.y - l * z.height;
                    r = q + w.crop.height
                } else {
                    v = (w._frame.width) * (1 - m);
                    u = (w._frame.width) * -m;
                    r = w._frame.height * (1 - l);
                    q = w._frame.height * -l
                }
                var n = this.currentBatchSize * this.vertByteSize;
                var y = x.worldTransform;
                var E = y.a;
                var D = y.b;
                var B = y.c;
                var A = y.d;
                var F = y.tx;
                var C = y.ty;
                var s = this.colors;
                var p = this.positions;
                if (this.renderer.roundPixels) {
                    p[n] = E * u + B * q + F | 0;
                    p[n + 1] = A * q + D * u + C | 0;
                    p[n + 5] = E * v + B * q + F | 0;
                    p[n + 6] = A * q + D * v + C | 0;
                    p[n + 10] = E * v + B * r + F | 0;
                    p[n + 11] = A * r + D * v + C | 0;
                    p[n + 15] = E * u + B * r + F | 0;
                    p[n + 16] = A * r + D * u + C | 0
                } else {
                    p[n] = E * u + B * q + F;
                    p[n + 1] = A * q + D * u + C;
                    p[n + 5] = E * v + B * q + F;
                    p[n + 6] = A * q + D * v + C;
                    p[n + 10] = E * v + B * r + F;
                    p[n + 11] = A * r + D * v + C;
                    p[n + 15] = E * u + B * r + F;
                    p[n + 16] = A * r + D * u + C
                }
                p[n + 2] = t.x0;
                p[n + 3] = t.y0;
                p[n + 7] = t.x1;
                p[n + 8] = t.y1;
                p[n + 12] = t.x2;
                p[n + 13] = t.y2;
                p[n + 17] = t.x3;
                p[n + 18] = t.y3;
                var o = x.tint;
                s[n + 4] = s[n + 9] = s[n + 14] = s[n + 19] = (o >> 16) + (o & 65280) + ((o & 255) << 16) + (x.worldAlpha * 255 << 24);
                this.sprites[this.currentBatchSize++] = x
            }
            ;
            j.prototype.flush = function() {
                if (this.currentBatchSize === 0) {
                    return
                }
                var t = this.renderer.gl;
                var v;
                if (this.currentBatchSize > (this.size * 0.5)) {
                    t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices)
                } else {
                    var x = this.positions.subarray(0, this.currentBatchSize * this.vertByteSize);
                    t.bufferSubData(t.ARRAY_BUFFER, 0, x)
                }
                var A, p, l;
                var w = 0;
                var n = 0;
                var u = null;
                var o = this.renderer.blendModeManager.currentBlendMode;
                var m = null;
                var s = false;
                var y = false;
                var z;
                for (var r = 0, q = this.currentBatchSize; r < q; r++) {
                    z = this.sprites[r];
                    A = z._texture.baseTexture;
                    p = z.blendMode;
                    l = z.shader || this.shader;
                    s = o !== p;
                    y = m !== l;
                    if (u !== A || s || y) {
                        this.renderBatch(u, w, n);
                        n = r;
                        w = 0;
                        u = A;
                        if (s) {
                            o = p;
                            this.renderer.blendModeManager.setBlendMode(o)
                        }
                        if (y) {
                            m = l;
                            v = m.shaders ? m.shaders[t.id] : m;
                            if (!v) {
                                v = m.getShader(this.renderer)
                            }
                            this.renderer.shaderManager.setShader(v);
                            v.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(true);
                            v.syncUniforms();
                            t.activeTexture(t.TEXTURE0)
                        }
                    }
                    w++
                }
                this.renderBatch(u, w, n);
                this.currentBatchSize = 0
            }
            ;
            j.prototype.renderBatch = function(m, l, o) {
                if (l === 0) {
                    return
                }
                var n = this.renderer.gl;
                if (!m._glTextures[n.id]) {
                    this.renderer.updateTexture(m)
                } else {
                    n.bindTexture(n.TEXTURE_2D, m._glTextures[n.id])
                }
                n.drawElements(n.TRIANGLES, l * 6, n.UNSIGNED_SHORT, o * 6 * 2);
                this.renderer.drawCount++
            }
            ;
            j.prototype.start = function() {
                var m = this.renderer.gl;
                m.bindBuffer(m.ARRAY_BUFFER, this.vertexBuffer);
                m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var l = this.vertByteSize;
                m.vertexAttribPointer(this.shader.attributes.aVertexPosition, 2, m.FLOAT, false, l, 0);
                m.vertexAttribPointer(this.shader.attributes.aTextureCoord, 2, m.FLOAT, false, l, 2 * 4);
                m.vertexAttribPointer(this.shader.attributes.aColor, 4, m.UNSIGNED_BYTE, true, l, 4 * 4)
            }
            ;
            j.prototype.destroy = function() {
                this.renderer.gl.deleteBuffer(this.vertexBuffer);
                this.renderer.gl.deleteBuffer(this.indexBuffer);
                this.shader.destroy();
                this.renderer = null;
                this.vertices = null;
                this.positions = null;
                this.colors = null;
                this.indices = null;
                this.vertexBuffer = null;
                this.indexBuffer = null;
                this.currentBaseTexture = null;
                this.drawing = false;
                this.textures = null;
                this.blendModes = null;
                this.shaders = null;
                this.sprites = null;
                this.shader = null
            }
        }
        , {
            "../../const": 21,
            "../../renderers/webgl/WebGLRenderer": 47,
            "../../renderers/webgl/utils/ObjectRenderer": 61
        }],
        67: [function(h, j, f) {
            var g = h("../sprites/Sprite")
              , i = h("../textures/Texture")
              , l = h("../math")
              , e = h("../const");
            function k(p, n, m) {
                this.canvas = document.createElement("canvas");
                this.context = this.canvas.getContext("2d");
                this.resolution = m || e.RESOLUTION;
                this._text = null;
                this._style = null;
                var o = i.fromCanvas(this.canvas);
                o.trim = new l.Rectangle();
                g.call(this, o);
                this.text = p;
                this.style = n
            }
            k.prototype = Object.create(g.prototype);
            k.prototype.constructor = k;
            j.exports = k;
            k.fontPropertiesCache = {};
            k.fontPropertiesCanvas = document.createElement("canvas");
            k.fontPropertiesContext = k.fontPropertiesCanvas.getContext("2d");
            Object.defineProperties(k.prototype, {
                width: {
                    get: function() {
                        if (this.dirty) {
                            this.updateText()
                        }
                        return this.scale.x * this._texture._frame.width
                    },
                    set: function(m) {
                        this.scale.x = m / this._texture._frame.width;
                        this._width = m
                    }
                },
                height: {
                    get: function() {
                        if (this.dirty) {
                            this.updateText()
                        }
                        return this.scale.y * this._texture._frame.height
                    },
                    set: function(m) {
                        this.scale.y = m / this._texture._frame.height;
                        this._height = m
                    }
                },
                style: {
                    get: function() {
                        return this._style
                    },
                    set: function(m) {
                        m = m || {};
                        m.font = m.font || "bold 20pt Arial";
                        m.fill = m.fill || "black";
                        m.align = m.align || "left";
                        m.stroke = m.stroke || "black";
                        m.strokeThickness = m.strokeThickness || 0;
                        m.wordWrap = m.wordWrap || false;
                        m.wordWrapWidth = m.wordWrapWidth || 100;
                        m.dropShadow = m.dropShadow || false;
                        m.dropShadowColor = m.dropShadowColor || "#000000";
                        m.dropShadowAngle = m.dropShadowAngle || Math.PI / 6;
                        m.dropShadowDistance = m.dropShadowDistance || 5;
                        m.padding = m.padding || 0;
                        m.textBaseline = m.textBaseline || "alphabetic";
                        m.lineJoin = m.lineJoin || "miter";
                        m.miterLimit = m.miterLimit || 10;
                        this._style = m;
                        this.dirty = true
                    }
                },
                text: {
                    get: function() {
                        return this._text
                    },
                    set: function(m) {
                        m = m.toString() || " ";
                        if (this._text === m) {
                            return
                        }
                        this._text = m;
                        this.dirty = true
                    }
                }
            });
            k.prototype.updateText = function() {
                var n = this._style;
                this.context.font = n.font;
                var t = n.wordWrap ? this.wordWrap(this._text) : this._text;
                var z = t.split(/(?:\r\n|\r|\n)/);
                var s = new Array(z.length);
                var A = 0;
                var q = this.determineFontProperties(n.font);
                for (var u = 0; u < z.length; u++) {
                    var v = this.context.measureText(z[u]).width;
                    s[u] = v;
                    A = Math.max(A, v)
                }
                var p = A + n.strokeThickness;
                if (n.dropShadow) {
                    p += n.dropShadowDistance
                }
                this.canvas.width = (p + this.context.lineWidth) * this.resolution;
                var x = this.style.lineHeight || q.fontSize + n.strokeThickness;
                var y = x * z.length;
                if (n.dropShadow) {
                    y += n.dropShadowDistance
                }
                this.canvas.height = (y + this._style.padding * 2) * this.resolution;
                this.context.scale(this.resolution, this.resolution);
                if (navigator.isCocoonJS) {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                }
                this.context.font = n.font;
                this.context.strokeStyle = n.stroke;
                this.context.lineWidth = n.strokeThickness;
                this.context.textBaseline = n.textBaseline;
                this.context.lineJoin = n.lineJoin;
                this.context.miterLimit = n.miterLimit;
                var r;
                var o;
                if (n.dropShadow) {
                    this.context.fillStyle = n.dropShadowColor;
                    var w = Math.cos(n.dropShadowAngle) * n.dropShadowDistance;
                    var m = Math.sin(n.dropShadowAngle) * n.dropShadowDistance;
                    for (u = 0; u < z.length; u++) {
                        r = n.strokeThickness / 2;
                        o = (n.strokeThickness / 2 + u * x) + q.ascent;
                        if (n.align === "right") {
                            r += A - s[u]
                        } else {
                            if (n.align === "center") {
                                r += (A - s[u]) / 2
                            }
                        }
                        if (n.fill) {
                            this.context.fillText(z[u], r + w, o + m + this._style.padding)
                        }
                    }
                }
                this.context.fillStyle = n.fill;
                for (u = 0; u < z.length; u++) {
                    r = n.strokeThickness / 2;
                    o = (n.strokeThickness / 2 + u * x) + q.ascent;
                    if (n.align === "right") {
                        r += A - s[u]
                    } else {
                        if (n.align === "center") {
                            r += (A - s[u]) / 2
                        }
                    }
                    if (n.stroke && n.strokeThickness) {
                        this.context.strokeText(z[u], r, o + this._style.padding)
                    }
                    if (n.fill) {
                        this.context.fillText(z[u], r, o + this._style.padding)
                    }
                }
                this.updateTexture()
            }
            ;
            k.prototype.updateTexture = function() {
                var m = this._texture;
                m.baseTexture.hasLoaded = true;
                m.baseTexture.resolution = this.resolution;
                m.baseTexture.width = this.canvas.width / this.resolution;
                m.baseTexture.height = this.canvas.height / this.resolution;
                m.crop.width = m._frame.width = this.canvas.width / this.resolution;
                m.crop.height = m._frame.height = this.canvas.height / this.resolution;
                m.trim.x = 0;
                m.trim.y = -this._style.padding;
                m.trim.width = m._frame.width;
                m.trim.height = m._frame.height - this._style.padding * 2;
                this._width = this.canvas.width / this.resolution;
                this._height = this.canvas.height / this.resolution;
                m.baseTexture.emit("update", m.baseTexture);
                this.dirty = false
            }
            ;
            k.prototype.renderWebGL = function(m) {
                if (this.dirty) {
                    this.updateText()
                }
                g.prototype.renderWebGL.call(this, m)
            }
            ;
            k.prototype._renderCanvas = function(m) {
                if (this.dirty) {
                    this.updateText()
                }
                g.prototype._renderCanvas.call(this, m)
            }
            ;
            k.prototype.determineFontProperties = function(r) {
                var u = k.fontPropertiesCache[r];
                if (!u) {
                    u = {};
                    var o = k.fontPropertiesCanvas;
                    var n = k.fontPropertiesContext;
                    n.font = r;
                    var m = Math.ceil(n.measureText("|MÉq").width);
                    var t = Math.ceil(n.measureText("M").width);
                    var y = 2 * t;
                    t = t * 1.4 | 0;
                    o.width = m;
                    o.height = y;
                    n.fillStyle = "#f00";
                    n.fillRect(0, 0, m, y);
                    n.font = r;
                    n.textBaseline = "alphabetic";
                    n.fillStyle = "#000";
                    n.fillText("|MÉq", 0, t);
                    var v = n.getImageData(0, 0, m, y).data;
                    var p = v.length;
                    var z = m * 4;
                    var s, q;
                    var x = 0;
                    var w = false;
                    for (s = 0; s < t; s++) {
                        for (q = 0; q < z; q += 4) {
                            if (v[x + q] !== 255) {
                                w = true;
                                break
                            }
                        }
                        if (!w) {
                            x += z
                        } else {
                            break
                        }
                    }
                    u.ascent = t - s;
                    x = p - z;
                    w = false;
                    for (s = y; s > t; s--) {
                        for (q = 0; q < z; q += 4) {
                            if (v[x + q] !== 255) {
                                w = true;
                                break
                            }
                        }
                        if (!w) {
                            x -= z
                        } else {
                            break
                        }
                    }
                    u.descent = s - t;
                    u.fontSize = u.ascent + u.descent;
                    k.fontPropertiesCache[r] = u
                }
                return u
            }
            ;
            k.prototype.wordWrap = function(s) {
                var v = "";
                var u = s.split("\n");
                var m = this._style.wordWrapWidth;
                for (var p = 0; p < u.length; p++) {
                    var o = m;
                    var r = u[p].split(" ");
                    for (var n = 0; n < r.length; n++) {
                        var t = this.context.measureText(r[n]).width;
                        var q = t + this.context.measureText(" ").width;
                        if (n === 0 || q > o) {
                            if (n > 0) {
                                v += "\n"
                            }
                            v += r[n];
                            o = m - t
                        } else {
                            o -= q;
                            v += " " + r[n]
                        }
                    }
                    if (p < u.length - 1) {
                        v += "\n"
                    }
                }
                return v
            }
            ;
            k.prototype.getBounds = function(m) {
                if (this.dirty) {
                    this.updateText()
                }
                return g.prototype.getBounds.call(this, m)
            }
            ;
            k.prototype.destroy = function(m) {
                this.context = null;
                this.canvas = null;
                this._style = null;
                this._texture.destroy(m === undefined ? true : m)
            }
        }
        , {
            "../const": 21,
            "../math": 31,
            "../sprites/Sprite": 65,
            "../textures/Texture": 70
        }],
        68: [function(h, i, g) {
            var f = h("../utils")
              , e = h("../const")
              , j = h("eventemitter3");
            function k(n, m, l) {
                j.call(this);
                this.uuid = f.uuid();
                this.resolution = l || 1;
                this.width = 100;
                this.height = 100;
                this.realWidth = 100;
                this.realHeight = 100;
                this.scaleMode = m || e.SCALE_MODES.DEFAULT;
                this.hasLoaded = false;
                this.isLoading = false;
                this.source = null;
                this.premultipliedAlpha = true;
                this.imageUrl = null;
                this.isPowerOfTwo = false;
                this.mipmap = false;
                this._glTextures = [];
                if (n) {
                    this.loadSource(n)
                }
            }
            k.prototype = Object.create(j.prototype);
            k.prototype.constructor = k;
            i.exports = k;
            k.prototype.update = function() {
                this.realWidth = this.source.naturalWidth || this.source.width;
                this.realHeight = this.source.naturalHeight || this.source.height;
                this.width = this.realWidth / this.resolution;
                this.height = this.realHeight / this.resolution;
                this.isPowerOfTwo = f.isPowerOfTwo(this.realWidth, this.realHeight);
                this.emit("update", this)
            }
            ;
            k.prototype.loadSource = function(n) {
                var m = this.isLoading;
                this.hasLoaded = false;
                this.isLoading = false;
                if (m && this.source) {
                    this.source.onload = null;
                    this.source.onerror = null
                }
                this.source = n;
                if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
                    this._sourceLoaded()
                } else {
                    if (!n.getContext) {
                        this.isLoading = true;
                        var l = this;
                        n.onload = function() {
                            n.onload = null;
                            n.onerror = null;
                            if (!l.isLoading) {
                                return
                            }
                            l.isLoading = false;
                            l._sourceLoaded();
                            l.emit("loaded", l)
                        }
                        ;
                        n.onerror = function() {
                            n.onload = null;
                            n.onerror = null;
                            if (!l.isLoading) {
                                return
                            }
                            l.isLoading = false;
                            l.emit("error", l)
                        }
                        ;
                        if (n.complete && n.src) {
                            this.isLoading = false;
                            n.onload = null;
                            n.onerror = null;
                            if (n.width && n.height) {
                                this._sourceLoaded();
                                if (m) {
                                    this.emit("loaded", this)
                                }
                            } else {
                                if (m) {
                                    this.emit("error", this)
                                }
                            }
                        }
                    }
                }
            }
            ;
            k.prototype._sourceLoaded = function() {
                this.hasLoaded = true;
                this.update()
            }
            ;
            k.prototype.destroy = function() {
                if (this.imageUrl) {
                    delete f.BaseTextureCache[this.imageUrl];
                    delete f.TextureCache[this.imageUrl];
                    this.imageUrl = null;
                    if (!navigator.isCocoonJS) {
                        this.source.src = ""
                    }
                } else {
                    if (this.source && this.source._pixiId) {
                        delete f.BaseTextureCache[this.source._pixiId]
                    }
                }
                this.source = null;
                this.dispose()
            }
            ;
            k.prototype.dispose = function() {
                this.emit("dispose", this);
                this._glTextures.length = 0
            }
            ;
            k.prototype.updateSourceImage = function(l) {
                this.source.src = l;
                this.loadSource(this.source)
            }
            ;
            k.fromImage = function(m, l, n) {
                var o = f.BaseTextureCache[m];
                if (l === undefined && m.indexOf("data:") !== 0) {
                    l = true
                }
                if (!o) {
                    var p = new Image();
                    if (l) {
                        p.crossOrigin = ""
                    }
                    o = new k(p,n);
                    o.imageUrl = m;
                    p.src = m;
                    f.BaseTextureCache[m] = o;
                    o.resolution = f.getResolutionOfUrl(m)
                }
                return o
            }
            ;
            k.fromCanvas = function(l, m) {
                if (!l._pixiId) {
                    l._pixiId = "canvas_" + f.uuid()
                }
                var n = f.BaseTextureCache[l._pixiId];
                if (!n) {
                    n = new k(l,m);
                    f.BaseTextureCache[l._pixiId] = n
                }
                return n
            }
        }
        , {
            "../const": 21,
            "../utils": 74,
            eventemitter3: 10
        }],
        69: [function(g, f, i) {
            var k = g("./BaseTexture")
              , h = g("./Texture")
              , e = g("../renderers/webgl/utils/RenderTarget")
              , l = g("../renderers/webgl/managers/FilterManager")
              , n = g("../renderers/canvas/utils/CanvasBuffer")
              , o = g("../math")
              , p = g("../const")
              , m = new o.Matrix();
            function j(v, t, q, s, r) {
                if (!v) {
                    throw new Error("Unable to create RenderTexture, you must pass a renderer into the constructor.")
                }
                t = t || 100;
                q = q || 100;
                r = r || p.RESOLUTION;
                var u = new k();
                u.width = t;
                u.height = q;
                u.resolution = r;
                u.scaleMode = s || p.SCALE_MODES.DEFAULT;
                u.hasLoaded = true;
                h.call(this, u, new o.Rectangle(0,0,t,q));
                this.width = t;
                this.height = q;
                this.resolution = r;
                this.render = null;
                this.renderer = v;
                if (this.renderer.type === p.RENDERER_TYPE.WEBGL) {
                    var w = this.renderer.gl;
                    this.textureBuffer = new e(w,this.width,this.height,u.scaleMode,this.resolution);
                    this.baseTexture._glTextures[w.id] = this.textureBuffer.texture;
                    this.filterManager = new l(this.renderer);
                    this.filterManager.onContextChange();
                    this.filterManager.resize(t, q);
                    this.render = this.renderWebGL;
                    this.renderer.currentRenderer.start();
                    this.renderer.currentRenderTarget.activate()
                } else {
                    this.render = this.renderCanvas;
                    this.textureBuffer = new n(this.width * this.resolution,this.height * this.resolution);
                    this.baseTexture.source = this.textureBuffer.canvas
                }
                this.valid = true;
                this._updateUvs()
            }
            j.prototype = Object.create(h.prototype);
            j.prototype.constructor = j;
            f.exports = j;
            j.prototype.resize = function(s, q, r) {
                if (s === this.width && q === this.height) {
                    return
                }
                this.valid = (s > 0 && q > 0);
                this.width = this._frame.width = this.crop.width = s;
                this.height = this._frame.height = this.crop.height = q;
                if (r) {
                    this.baseTexture.width = this.width;
                    this.baseTexture.height = this.height
                }
                if (!this.valid) {
                    return
                }
                this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
                if (this.filterManager) {
                    this.filterManager.resize(this.width, this.height)
                }
            }
            ;
            j.prototype.clear = function() {
                if (!this.valid) {
                    return
                }
                if (this.renderer.type === p.RENDERER_TYPE.WEBGL) {
                    this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer)
                }
                this.textureBuffer.clear()
            }
            ;
            j.prototype.renderWebGL = function(x, s, q, w) {
                if (!this.valid) {
                    return
                }
                w = (w !== undefined) ? w : true;
                this.textureBuffer.transform = s;
                this.textureBuffer.activate();
                x.worldAlpha = x.alpha;
                if (w) {
                    x.worldTransform.identity();
                    x.currentBounds = null;
                    var v = x.children;
                    var u, t;
                    for (u = 0,
                    t = v.length; u < t; ++u) {
                        v[u].updateTransform()
                    }
                }
                var r = this.renderer.filterManager;
                this.renderer.filterManager = this.filterManager;
                this.renderer.renderDisplayObject(x, this.textureBuffer, q);
                this.renderer.filterManager = r
            }
            ;
            j.prototype.renderCanvas = function(y, A, w, t) {
                if (!this.valid) {
                    return
                }
                t = !!t;
                var r = y.worldTransform;
                var x = m;
                x.identity();
                if (A) {
                    x.append(A)
                }
                y.worldTransform = x;
                y.worldAlpha = 1;
                var s = y.children;
                var v, u;
                for (v = 0,
                u = s.length; v < u; ++v) {
                    s[v].updateTransform()
                }
                if (w) {
                    this.textureBuffer.clear()
                }
                y.worldTransform = r;
                var q = this.textureBuffer.context;
                var z = this.renderer.resolution;
                this.renderer.resolution = this.resolution;
                this.renderer.renderDisplayObject(y, q);
                this.renderer.resolution = z
            }
            ;
            j.prototype.destroy = function() {
                h.prototype.destroy.call(this, true);
                this.textureBuffer.destroy();
                if (this.filterManager) {
                    this.filterManager.destroy()
                }
                this.renderer = null
            }
            ;
            j.prototype.getImage = function() {
                var q = new Image();
                q.src = this.getBase64();
                return q
            }
            ;
            j.prototype.getBase64 = function() {
                return this.getCanvas().toDataURL()
            }
            ;
            j.prototype.getCanvas = function() {
                if (this.renderer.type === p.RENDERER_TYPE.WEBGL) {
                    var v = this.renderer.gl;
                    var t = this.textureBuffer.size.width;
                    var q = this.textureBuffer.size.height;
                    var r = new Uint8Array(4 * t * q);
                    v.bindFramebuffer(v.FRAMEBUFFER, this.textureBuffer.frameBuffer);
                    v.readPixels(0, 0, t, q, v.RGBA, v.UNSIGNED_BYTE, r);
                    v.bindFramebuffer(v.FRAMEBUFFER, null);
                    var u = new n(t,q);
                    var s = u.context.getImageData(0, 0, t, q);
                    s.data.set(r);
                    u.context.putImageData(s, 0, 0);
                    return u.canvas
                } else {
                    return this.textureBuffer.canvas
                }
            }
            ;
            j.prototype.getPixels = function() {
                var s, q;
                if (this.renderer.type === p.RENDERER_TYPE.WEBGL) {
                    var t = this.renderer.gl;
                    s = this.textureBuffer.size.width;
                    q = this.textureBuffer.size.height;
                    var r = new Uint8Array(4 * s * q);
                    t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer);
                    t.readPixels(0, 0, s, q, t.RGBA, t.UNSIGNED_BYTE, r);
                    t.bindFramebuffer(t.FRAMEBUFFER, null);
                    return r
                } else {
                    s = this.textureBuffer.canvas.width;
                    q = this.textureBuffer.canvas.height;
                    return this.textureBuffer.canvas.getContext("2d").getImageData(0, 0, s, q).data
                }
            }
            ;
            j.prototype.getPixel = function(q, t) {
                if (this.renderer.type === p.RENDERER_TYPE.WEBGL) {
                    var s = this.renderer.gl;
                    var r = new Uint8Array(4);
                    s.bindFramebuffer(s.FRAMEBUFFER, this.textureBuffer.frameBuffer);
                    s.readPixels(q, t, 1, 1, s.RGBA, s.UNSIGNED_BYTE, r);
                    s.bindFramebuffer(s.FRAMEBUFFER, null);
                    return r
                } else {
                    return this.textureBuffer.canvas.getContext("2d").getImageData(q, t, 1, 1).data
                }
            }
        }
        , {
            "../const": 21,
            "../math": 31,
            "../renderers/canvas/utils/CanvasBuffer": 43,
            "../renderers/webgl/managers/FilterManager": 52,
            "../renderers/webgl/utils/RenderTarget": 63,
            "./BaseTexture": 68,
            "./Texture": 70
        }],
        70: [function(f, e, h) {
            var i = f("./BaseTexture")
              , m = f("./VideoBaseTexture")
              , j = f("./TextureUvs")
              , n = f("eventemitter3")
              , k = f("../math")
              , l = f("../utils");
            function g(r, s, q, o, p) {
                n.call(this);
                this.noFrame = false;
                if (!s) {
                    this.noFrame = true;
                    s = new k.Rectangle(0,0,1,1)
                }
                if (r instanceof g) {
                    r = r.baseTexture
                }
                this.baseTexture = r;
                this._frame = s;
                this.trim = o;
                this.valid = false;
                this.requiresUpdate = false;
                this._uvs = null;
                this.width = 0;
                this.height = 0;
                this.crop = q || s;
                this.rotate = !!p;
                if (r.hasLoaded) {
                    if (this.noFrame) {
                        s = new k.Rectangle(0,0,r.width,r.height);
                        r.on("update", this.onBaseTextureUpdated, this)
                    }
                    this.frame = s
                } else {
                    r.once("loaded", this.onBaseTextureLoaded, this)
                }
            }
            g.prototype = Object.create(n.prototype);
            g.prototype.constructor = g;
            e.exports = g;
            Object.defineProperties(g.prototype, {
                frame: {
                    get: function() {
                        return this._frame
                    },
                    set: function(o) {
                        this._frame = o;
                        this.noFrame = false;
                        this.width = o.width;
                        this.height = o.height;
                        if (!this.trim && !this.rotate && (o.x + o.width > this.baseTexture.width || o.y + o.height > this.baseTexture.height)) {
                            throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this)
                        }
                        this.valid = o && o.width && o.height && this.baseTexture.hasLoaded;
                        if (this.trim) {
                            this.width = this.trim.width;
                            this.height = this.trim.height;
                            this._frame.width = this.trim.width;
                            this._frame.height = this.trim.height
                        } else {
                            this.crop = o
                        }
                        if (this.valid) {
                            this._updateUvs()
                        }
                    }
                }
            });
            g.prototype.update = function() {
                this.baseTexture.update()
            }
            ;
            g.prototype.onBaseTextureLoaded = function(o) {
                if (this.noFrame) {
                    this.frame = new k.Rectangle(0,0,o.width,o.height)
                } else {
                    this.frame = this._frame
                }
                this.emit("update", this)
            }
            ;
            g.prototype.onBaseTextureUpdated = function(o) {
                this._frame.width = o.width;
                this._frame.height = o.height;
                this.emit("update", this)
            }
            ;
            g.prototype.destroy = function(o) {
                if (this.baseTexture) {
                    if (o) {
                        this.baseTexture.destroy()
                    }
                    this.baseTexture.off("update", this.onBaseTextureUpdated);
                    this.baseTexture.off("loaded", this.onBaseTextureLoaded);
                    this.baseTexture = null
                }
                this._frame = null;
                this._uvs = null;
                this.trim = null;
                this.crop = null;
                this.valid = false
            }
            ;
            g.prototype.clone = function() {
                return new g(this.baseTexture,this.frame,this.crop,this.trim,this.rotate)
            }
            ;
            g.prototype._updateUvs = function() {
                if (!this._uvs) {
                    this._uvs = new j()
                }
                this._uvs.set(this.crop, this.baseTexture, this.rotate)
            }
            ;
            g.fromImage = function(p, o, q) {
                var r = l.TextureCache[p];
                if (!r) {
                    r = new g(i.fromImage(p, o, q));
                    l.TextureCache[p] = r
                }
                return r
            }
            ;
            g.fromFrame = function(p) {
                var o = l.TextureCache[p];
                if (!o) {
                    throw new Error('The frameId "' + p + '" does not exist in the texture cache')
                }
                return o
            }
            ;
            g.fromCanvas = function(o, p) {
                return new g(i.fromCanvas(o, p))
            }
            ;
            g.fromVideo = function(p, o) {
                if (typeof p === "string") {
                    return g.fromVideoUrl(p, o)
                } else {
                    return new g(m.fromVideo(p, o))
                }
            }
            ;
            g.fromVideoUrl = function(p, o) {
                return new g(m.fromUrl(p, o))
            }
            ;
            g.addTextureToCache = function(o, p) {
                l.TextureCache[p] = o
            }
            ;
            g.removeTextureFromCache = function(p) {
                var o = l.TextureCache[p];
                delete l.TextureCache[p];
                delete l.BaseTextureCache[p];
                return o
            }
            ;
            g.EMPTY = new g(new i())
        }
        , {
            "../math": 31,
            "../utils": 74,
            "./BaseTexture": 68,
            "./TextureUvs": 71,
            "./VideoBaseTexture": 72,
            eventemitter3: 10
        }],
        71: [function(f, g, e) {
            function h() {
                this.x0 = 0;
                this.y0 = 0;
                this.x1 = 1;
                this.y1 = 0;
                this.x2 = 1;
                this.y2 = 1;
                this.x3 = 0;
                this.y3 = 1
            }
            g.exports = h;
            h.prototype.set = function(m, l, j) {
                var i = l.width;
                var k = l.height;
                if (j) {
                    this.x0 = (m.x + m.height) / i;
                    this.y0 = m.y / k;
                    this.x1 = (m.x + m.height) / i;
                    this.y1 = (m.y + m.width) / k;
                    this.x2 = m.x / i;
                    this.y2 = (m.y + m.width) / k;
                    this.x3 = m.x / i;
                    this.y3 = m.y / k
                } else {
                    this.x0 = m.x / i;
                    this.y0 = m.y / k;
                    this.x1 = (m.x + m.width) / i;
                    this.y1 = m.y / k;
                    this.x2 = (m.x + m.width) / i;
                    this.y2 = (m.y + m.height) / k;
                    this.x3 = m.x / i;
                    this.y3 = (m.y + m.height) / k
                }
            }
        }
        , {}],
        72: [function(h, i, g) {
            var k = h("./BaseTexture")
              , f = h("../utils");
            function e(m, l) {
                if (!m) {
                    throw new Error("No video source element specified.")
                }
                if ((m.readyState === m.HAVE_ENOUGH_DATA || m.readyState === m.HAVE_FUTURE_DATA) && m.width && m.height) {
                    m.complete = true
                }
                k.call(this, m, l);
                this.autoUpdate = false;
                this._onUpdate = this._onUpdate.bind(this);
                this._onCanPlay = this._onCanPlay.bind(this);
                if (!m.complete) {
                    m.addEventListener("canplay", this._onCanPlay);
                    m.addEventListener("canplaythrough", this._onCanPlay);
                    m.addEventListener("play", this._onPlayStart.bind(this));
                    m.addEventListener("pause", this._onPlayStop.bind(this))
                }
                this.__loaded = false
            }
            e.prototype = Object.create(k.prototype);
            e.prototype.constructor = e;
            i.exports = e;
            e.prototype._onUpdate = function() {
                if (this.autoUpdate) {
                    window.requestAnimationFrame(this._onUpdate);
                    this.update()
                }
            }
            ;
            e.prototype._onPlayStart = function() {
                if (!this.autoUpdate) {
                    window.requestAnimationFrame(this._onUpdate);
                    this.autoUpdate = true
                }
            }
            ;
            e.prototype._onPlayStop = function() {
                this.autoUpdate = false
            }
            ;
            e.prototype._onCanPlay = function() {
                this.hasLoaded = true;
                if (this.source) {
                    this.source.removeEventListener("canplay", this._onCanPlay);
                    this.source.removeEventListener("canplaythrough", this._onCanPlay);
                    this.width = this.source.videoWidth;
                    this.height = this.source.videoHeight;
                    this.source.play();
                    if (!this.__loaded) {
                        this.__loaded = true;
                        this.emit("loaded", this)
                    }
                }
            }
            ;
            e.prototype.destroy = function() {
                if (this.source && this.source._pixiId) {
                    delete f.BaseTextureCache[this.source._pixiId];
                    delete this.source._pixiId
                }
                k.prototype.destroy.call(this)
            }
            ;
            e.fromVideo = function(n, l) {
                if (!n._pixiId) {
                    n._pixiId = "video_" + f.uuid()
                }
                var m = f.BaseTextureCache[n._pixiId];
                if (!m) {
                    m = new e(n,l);
                    f.BaseTextureCache[n._pixiId] = m
                }
                return m
            }
            ;
            e.fromUrl = function(l, n) {
                var o = document.createElement("video");
                if (Array.isArray(l)) {
                    for (var m = 0; m < l.length; ++m) {
                        o.appendChild(j(l.src || l, l.mime))
                    }
                } else {
                    o.appendChild(j(l.src || l, l.mime))
                }
                o.load();
                o.play();
                return e.fromVideo(o, n)
            }
            ;
            e.fromUrls = e.fromUrl;
            function j(n, l) {
                if (!l) {
                    l = "video/" + n.substr(n.lastIndexOf(".") + 1)
                }
                var m = document.createElement("source");
                m.src = n;
                m.type = l;
                return m
            }
        }
        , {
            "../utils": 74,
            "./BaseTexture": 68
        }],
        73: [function(g, h, f) {
            var e = h.exports = {};
            e.Triangulate = function(s) {
                var E = true;
                var t = s.length >> 1;
                if (t < 3) {
                    return []
                }
                var B = [];
                var r = [];
                for (var z = 0; z < t; z++) {
                    r.push(z)
                }
                z = 0;
                var w = t;
                while (w > 3) {
                    var x = r[(z + 0) % w];
                    var v = r[(z + 1) % w];
                    var u = r[(z + 2) % w];
                    var q = s[2 * x]
                      , m = s[2 * x + 1];
                    var C = s[2 * v]
                      , A = s[2 * v + 1];
                    var l = s[2 * u]
                      , k = s[2 * u + 1];
                    var o = false;
                    if (e._convex(q, m, C, A, l, k, E)) {
                        o = true;
                        for (var y = 0; y < w; y++) {
                            var D = r[y];
                            if (D === x || D === v || D === u) {
                                continue
                            }
                            if (e._PointInTriangle(s[2 * D], s[2 * D + 1], q, m, C, A, l, k)) {
                                o = false;
                                break
                            }
                        }
                    }
                    if (o) {
                        B.push(x, v, u);
                        r.splice((z + 1) % w, 1);
                        w--;
                        z = 0
                    } else {
                        if (z++ > 3 * w) {
                            if (E) {
                                B = [];
                                r = [];
                                for (z = 0; z < t; z++) {
                                    r.push(z)
                                }
                                z = 0;
                                w = t;
                                E = false
                            } else {
                                return null
                            }
                        }
                    }
                }
                B.push(r[0], r[1], r[2]);
                return B
            }
            ;
            e._PointInTriangle = function(y, x, s, r, F, E, o, m) {
                var l = o - s;
                var k = m - r;
                var q = F - s;
                var p = E - r;
                var D = y - s;
                var B = x - r;
                var C = l * l + k * k;
                var A = l * q + k * p;
                var z = l * D + k * B;
                var j = q * q + p * p;
                var i = q * D + p * B;
                var n = 1 / (C * j - A * A);
                var w = (j * z - A * i) * n;
                var t = (C * i - A * z) * n;
                return (w >= 0) && (t >= 0) && (w + t < 1)
            }
            ;
            e._convex = function(l, k, n, m, i, o, j) {
                return ((k - m) * (i - n) + (n - l) * (o - m) >= 0) === j
            }
        }
        , {}],
        74: [function(h, i, g) {
            var e = h("../const");
            var f = i.exports = {
                _uid: 0,
                _saidHello: false,
                pluginTarget: h("./pluginTarget"),
                PolyK: h("./PolyK"),
                async: h("async"),
                uuid: function() {
                    return ++f._uid
                },
                hex2rgb: function(k, j) {
                    j = j || [];
                    j[0] = (k >> 16 & 255) / 255;
                    j[1] = (k >> 8 & 255) / 255;
                    j[2] = (k & 255) / 255;
                    return j
                },
                hex2string: function(j) {
                    j = j.toString(16);
                    j = "000000".substr(0, 6 - j.length) + j;
                    return "#" + j
                },
                rgb2hex: function(j) {
                    return ((j[0] * 255 << 16) + (j[1] * 255 << 8) + j[2] * 255)
                },
                canUseNewCanvasBlendModes: function() {
                    if (typeof document === "undefined") {
                        return false
                    }
                    var k = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/";
                    var o = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==";
                    var j = new Image();
                    j.src = k + "AP804Oa6" + o;
                    var p = new Image();
                    p.src = k + "/wCKxvRF" + o;
                    var l = document.createElement("canvas");
                    l.width = 6;
                    l.height = 1;
                    var m = l.getContext("2d");
                    m.globalCompositeOperation = "multiply";
                    m.drawImage(j, 0, 0);
                    m.drawImage(p, 2, 0);
                    var n = m.getImageData(2, 0, 1, 1).data;
                    return (n[0] === 255 && n[1] === 0 && n[2] === 0)
                },
                getNextPowerOfTwo: function(k) {
                    if (k > 0 && (k & (k - 1)) === 0) {
                        return k
                    } else {
                        var j = 1;
                        while (j < k) {
                            j <<= 1
                        }
                        return j
                    }
                },
                isPowerOfTwo: function(k, j) {
                    return (k > 0 && (k & (k - 1)) === 0 && j > 0 && (j & (j - 1)) === 0)
                },
                getResolutionOfUrl: function(k) {
                    var j = e.RETINA_PREFIX.exec(k);
                    if (j) {
                        return parseFloat(j[1])
                    }
                    return 1
                },
                sayHello: function(k) {
                    if (f._saidHello) {
                        return
                    }
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                        var j = ["\n %c %c %c Pixi.js " + e.VERSION + " - ✰ " + k + " ✰  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                        window.console.log.apply(console, j)
                    } else {
                        if (window.console) {
                            window.console.log("Pixi.js " + e.VERSION + " - " + k + " - http://www.pixijs.com/")
                        }
                    }
                    f._saidHello = true
                },
                isWebGLSupported: function() {
                    var j = {
                        stencil: true
                    };
                    try {
                        if (!window.WebGLRenderingContext) {
                            return false
                        }
                        var k = document.createElement("canvas")
                          , m = k.getContext("webgl", j) || k.getContext("experimental-webgl", j);
                        return !!(m && m.getContextAttributes().stencil)
                    } catch (l) {
                        return false
                    }
                },
                TextureCache: {},
                BaseTextureCache: {}
            }
        }
        , {
            "../const": 21,
            "./PolyK": 73,
            "./pluginTarget": 75,
            async: 2
        }],
        75: [function(h, i, g) {
            function e(j) {
                j.__plugins = {};
                j.registerPlugin = function(l, k) {
                    j.__plugins[l] = k
                }
                ;
                j.prototype.initPlugins = function() {
                    this.plugins = this.plugins || {};
                    for (var k in j.__plugins) {
                        this.plugins[k] = new (j.__plugins[k])(this)
                    }
                }
                ;
                j.prototype.destroyPlugins = function() {
                    for (var k in this.plugins) {
                        this.plugins[k].destroy();
                        this.plugins[k] = null
                    }
                    this.plugins = null
                }
            }
            i.exports = {
                mixin: function f(j) {
                    e(j)
                }
            }
        }
        , {}],
        76: [function(h, i, g) {
            var f = h("./core")
              , k = h("./mesh")
              , j = h("./extras")
              , e = h("./core/utils");
            f.SpriteBatch = function() {
                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
            }
            ;
            f.AssetLoader = function() {
                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
            }
            ;
            Object.defineProperties(f, {
                Stage: {
                    get: function() {
                        console.warn("You do not need to use a PIXI Stage any more, you can simply render any container.");
                        return f.Container
                    }
                },
                DisplayObjectContainer: {
                    get: function() {
                        console.warn("DisplayObjectContainer has been shortened to Container, please use Container from now on.");
                        return f.Container
                    }
                },
                Strip: {
                    get: function() {
                        console.warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on.");
                        return k.Mesh
                    }
                },
                Rope: {
                    get: function() {
                        console.warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on.");
                        return k.Rope
                    }
                },
                MovieClip: {
                    get: function() {
                        console.warn("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on.");
                        return j.MovieClip
                    }
                },
                TilingSprite: {
                    get: function() {
                        console.warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on.");
                        return j.TilingSprite
                    }
                },
                BitmapText: {
                    get: function() {
                        console.warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on.");
                        return j.BitmapText
                    }
                },
                blendModes: {
                    get: function() {
                        console.warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on.");
                        return f.BLEND_MODES
                    }
                },
                scaleModes: {
                    get: function() {
                        console.warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on.");
                        return f.SCALE_MODES
                    }
                },
                BaseTextureCache: {
                    get: function() {
                        console.warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on.");
                        return e.BaseTextureCache
                    }
                },
                TextureCache: {
                    get: function() {
                        console.warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on.");
                        return e.TextureCache
                    }
                }
            });
            f.Sprite.prototype.setTexture = function(l) {
                this.texture = l;
                console.warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
            }
            ;
            j.BitmapText.prototype.setText = function(l) {
                this.text = l;
                console.warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
            }
            ;
            f.Text.prototype.setText = function(l) {
                this.text = l;
                console.warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
            }
            ;
            f.Text.prototype.setStyle = function(l) {
                this.style = l;
                console.warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
            }
            ;
            f.Texture.prototype.setFrame = function(l) {
                this.frame = l;
                console.warn("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")
            }
        }
        , {
            "./core": 28,
            "./core/utils": 74,
            "./extras": 83,
            "./mesh": 124
        }],
        77: [function(g, h, f) {
            var e = g("../core");
            function i(k, j) {
                e.Container.call(this);
                j = j || {};
                this.textWidth = 0;
                this.textHeight = 0;
                this._glyphs = [];
                this._font = {
                    tint: j.tint !== undefined ? j.tint : 16777215,
                    align: j.align || "left",
                    name: null,
                    size: 0
                };
                this.font = j.font;
                this._text = k;
                this.maxWidth = 0;
                this.dirty = false;
                this.updateText()
            }
            i.prototype = Object.create(e.Container.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                tint: {
                    get: function() {
                        return this._font.tint
                    },
                    set: function(j) {
                        this._font.tint = (typeof j === "number" && j >= 0) ? j : 16777215;
                        this.dirty = true
                    }
                },
                align: {
                    get: function() {
                        return this._font.align
                    },
                    set: function(j) {
                        this._font.align = j || "left";
                        this.dirty = true
                    }
                },
                font: {
                    get: function() {
                        return this._font
                    },
                    set: function(j) {
                        if (!j) {
                            return
                        }
                        if (typeof j === "string") {
                            j = j.split(" ");
                            this._font.name = j.length === 1 ? j[0] : j.slice(1).join(" ");
                            this._font.size = j.length >= 2 ? parseInt(j[0], 10) : i.fonts[this._font.name].size
                        } else {
                            this._font.name = j.name;
                            this._font.size = typeof j.size === "number" ? j.size : parseInt(j.size, 10)
                        }
                        this.dirty = true
                    }
                },
                text: {
                    get: function() {
                        return this._text
                    },
                    set: function(j) {
                        j = j.toString() || " ";
                        if (this._text === j) {
                            return
                        }
                        this._text = j;
                        this.dirty = true
                    }
                }
            });
            i.prototype.updateText = function() {
                var x = i.fonts[this._font.name];
                var m = new e.math.Point();
                var n = null;
                var s = [];
                var r = 0;
                var t = 0;
                var A = [];
                var q = 0;
                var y = this._font.size / x.size;
                var o = -1;
                for (var v = 0; v < this.text.length; v++) {
                    var k = this.text.charCodeAt(v);
                    o = /(\s)/.test(this.text.charAt(v)) ? v : o;
                    if (/(?:\r\n|\r|\n)/.test(this.text.charAt(v))) {
                        A.push(r);
                        t = Math.max(t, r);
                        q++;
                        m.x = 0;
                        m.y += x.lineHeight;
                        n = null;
                        continue
                    }
                    if (o !== -1 && this.maxWidth > 0 && m.x * y > this.maxWidth) {
                        s.splice(o, v - o);
                        v = o;
                        o = -1;
                        A.push(r);
                        t = Math.max(t, r);
                        q++;
                        m.x = 0;
                        m.y += x.lineHeight;
                        n = null;
                        continue
                    }
                    var j = x.chars[k];
                    if (!j) {
                        continue
                    }
                    if (n && j.kerning[n]) {
                        m.x += j.kerning[n]
                    }
                    s.push({
                        texture: j.texture,
                        line: q,
                        charCode: k,
                        position: new e.math.Point(m.x + j.xOffset,m.y + j.yOffset)
                    });
                    r = m.x + (j.texture.width + j.xOffset);
                    m.x += j.xAdvance;
                    n = k
                }
                A.push(r);
                t = Math.max(t, r);
                var u = [];
                for (v = 0; v <= q; v++) {
                    var z = 0;
                    if (this._font.align === "right") {
                        z = t - A[v]
                    } else {
                        if (this._font.align === "center") {
                            z = (t - A[v]) / 2
                        }
                    }
                    u.push(z)
                }
                var l = s.length;
                var p = this.tint;
                for (v = 0; v < l; v++) {
                    var w = this._glyphs[v];
                    if (w) {
                        w.texture = s[v].texture
                    } else {
                        w = new e.Sprite(s[v].texture);
                        this._glyphs.push(w)
                    }
                    w.position.x = (s[v].position.x + u[s[v].line]) * y;
                    w.position.y = s[v].position.y * y;
                    w.scale.x = w.scale.y = y;
                    w.tint = p;
                    if (!w.parent) {
                        this.addChild(w)
                    }
                }
                for (v = l; v < this._glyphs.length; ++v) {
                    this.removeChild(this._glyphs[v])
                }
                this.textWidth = t * y;
                this.textHeight = (m.y + x.lineHeight) * y
            }
            ;
            i.prototype.updateTransform = function() {
                if (this.dirty) {
                    this.updateText();
                    this.dirty = false
                }
                this.containerUpdateTransform()
            }
            ;
            i.fonts = {}
        }
        , {
            "../core": 28
        }],
        78: [function(g, h, f) {
            var e = g("../core")
              , j = g("../ticker");
            function i(k) {
                e.Sprite.call(this, k[0]);
                this._textures = k;
                this.animationSpeed = 1;
                this.loop = true;
                this.onComplete = null;
                this._currentTime = 0;
                this.playing = false
            }
            i.prototype = Object.create(e.Sprite.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                totalFrames: {
                    get: function() {
                        return this._textures.length
                    }
                },
                textures: {
                    get: function() {
                        return this._textures
                    },
                    set: function(k) {
                        this._textures = k;
                        this.texture = this._textures[Math.floor(this._currentTime) % this._textures.length]
                    }
                },
                currentFrame: {
                    get: function() {
                        return Math.floor(this._currentTime) % this._textures.length
                    }
                }
            });
            i.prototype.stop = function() {
                if (!this.playing) {
                    return
                }
                this.playing = false;
                j.shared.remove(this.update, this)
            }
            ;
            i.prototype.play = function() {
                if (this.playing) {
                    return
                }
                this.playing = true;
                j.shared.add(this.update, this)
            }
            ;
            i.prototype.gotoAndStop = function(l) {
                this.stop();
                this._currentTime = l;
                var k = Math.floor(this._currentTime);
                this._texture = this._textures[k % this._textures.length]
            }
            ;
            i.prototype.gotoAndPlay = function(k) {
                this._currentTime = k;
                this.play()
            }
            ;
            i.prototype.update = function(k) {
                this._currentTime += this.animationSpeed * k;
                var l = Math.floor(this._currentTime);
                if (l < 0) {
                    if (this.loop) {
                        this._currentTime += this._textures.length;
                        this._texture = this._textures[this._currentTime]
                    } else {
                        this.gotoAndStop(0);
                        if (this.onComplete) {
                            this.onComplete()
                        }
                    }
                } else {
                    if (this.loop || l < this._textures.length) {
                        this._texture = this._textures[l % this._textures.length]
                    } else {
                        if (l >= this._textures.length) {
                            this.gotoAndStop(this.textures.length - 1);
                            if (this.onComplete) {
                                this.onComplete()
                            }
                        }
                    }
                }
            }
            ;
            i.prototype.destroy = function() {
                this.stop();
                e.Sprite.prototype.destroy.call(this)
            }
            ;
            i.fromFrames = function(m) {
                var k = [];
                for (var l = 0; l < m.length; ++l) {
                    k.push(new e.Texture.fromFrame(m[l]))
                }
                return new i(k)
            }
            ;
            i.fromImages = function(l) {
                var k = [];
                for (var m = 0; m < l.length; ++m) {
                    k.push(new e.Texture.fromImage(l[m]))
                }
                return new i(k)
            }
        }
        , {
            "../core": 28,
            "../ticker": 131
        }],
        79: [function(g, h, f) {
            var e = g("../core")
              , j = new e.Point();
            function i(m, l, k) {
                e.Sprite.call(this, m);
                this.tileScale = new e.math.Point(1,1);
                this.tilePosition = new e.math.Point(0,0);
                this._width = l || 100;
                this._height = k || 100;
                this._uvs = new e.TextureUvs();
                this._canvasPattern = null;
                this.shader = new e.AbstractFilter(["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "uniform vec4 uFrame;", "uniform vec4 uTransform;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vec2 coord = aTextureCoord;", "   coord -= uTransform.xy;", "   coord /= uTransform.zw;", "   coord /= uFrame.zw;", "   vTextureCoord = coord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n"),["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform vec4 uFrame;", "void main(void){", "   vec2 coord = fract(vTextureCoord);", "   coord *= uFrame.zw;", "   coord += uFrame.xy;", "   gl_FragColor =  texture2D(uSampler, coord) * vColor ;", "}"].join("\n"),{
                    uFrame: {
                        type: "4fv",
                        value: [0, 0, 1, 1]
                    },
                    uTransform: {
                        type: "4fv",
                        value: [0, 0, 1, 1]
                    }
                })
            }
            i.prototype = Object.create(e.Sprite.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                width: {
                    get: function() {
                        return this._width
                    },
                    set: function(k) {
                        this._width = k
                    }
                },
                height: {
                    get: function() {
                        return this._height
                    },
                    set: function(k) {
                        this._height = k
                    }
                }
            });
            i.prototype._onTextureUpdate = function() {
                return
            }
            ;
            i.prototype._renderWebGL = function(p) {
                var o = this._texture;
                if (!o || !o._uvs) {
                    return
                }
                var q = o._uvs
                  , m = o._frame.width
                  , l = o._frame.height
                  , k = o.baseTexture.width
                  , n = o.baseTexture.height;
                o._uvs = this._uvs;
                o._frame.width = this.width;
                o._frame.height = this.height;
                this.shader.uniforms.uFrame.value[0] = q.x0 + (0.5 / k);
                this.shader.uniforms.uFrame.value[1] = q.y0 + (0.5 / n);
                this.shader.uniforms.uFrame.value[2] = q.x1 - q.x0 + (-1 / k);
                this.shader.uniforms.uFrame.value[3] = q.y2 - q.y0 + (-1 / n);
                this.shader.uniforms.uTransform.value[0] = (this.tilePosition.x % k) / this._width;
                this.shader.uniforms.uTransform.value[1] = (this.tilePosition.y % n) / this._height;
                this.shader.uniforms.uTransform.value[2] = (k / this._width) * this.tileScale.x;
                this.shader.uniforms.uTransform.value[3] = (n / this._height) * this.tileScale.y;
                p.setObjectRenderer(p.plugins.sprite);
                p.plugins.sprite.render(this);
                o._uvs = q;
                o._frame.width = m;
                o._frame.height = l
            }
            ;
            i.prototype._renderCanvas = function(q) {
                var r = this._texture;
                if (!r.baseTexture.hasLoaded) {
                    return
                }
                var n = q.context
                  , o = this.worldTransform
                  , p = q.resolution
                  , l = r.baseTexture
                  , m = this.tilePosition.x % l.width
                  , k = this.tilePosition.y % l.height;
                if (!this._canvasPattern) {
                    var s = new e.CanvasBuffer(r._frame.width,r._frame.height);
                    s.context.drawImage(l.source, -r._frame.x, -r._frame.y);
                    this._canvasPattern = s.context.createPattern(s.canvas, "repeat")
                }
                n.globalAlpha = this.worldAlpha;
                n.setTransform(o.a * p, o.b * p, o.c * p, o.d * p, o.tx * p, o.ty * p);
                n.scale(this.tileScale.x, this.tileScale.y);
                n.translate(m + (this.anchor.x * -this._width), k + (this.anchor.y * -this._height));
                if (this.blendMode !== q.currentBlendMode) {
                    q.currentBlendMode = this.blendMode;
                    n.globalCompositeOperation = q.blendModes[q.currentBlendMode]
                }
                n.fillStyle = this._canvasPattern;
                n.fillRect(-m, -k, this._width / this.tileScale.x, this._height / this.tileScale.y)
            }
            ;
            i.prototype.getBounds = function() {
                var u = this._width;
                var t = this._height;
                var s = u * (1 - this.anchor.x);
                var r = u * -this.anchor.x;
                var q = t * (1 - this.anchor.y);
                var p = t * -this.anchor.y;
                var v = this.worldTransform;
                var I = v.a;
                var G = v.b;
                var F = v.c;
                var D = v.d;
                var J = v.tx;
                var H = v.ty;
                var z = I * r + F * p + J;
                var n = D * p + G * r + H;
                var y = I * s + F * p + J;
                var m = D * p + G * s + H;
                var x = I * s + F * q + J;
                var l = D * q + G * s + H;
                var w = I * r + F * q + J;
                var k = D * q + G * r + H;
                var E, C, B, A;
                E = z;
                E = y < E ? y : E;
                E = x < E ? x : E;
                E = w < E ? w : E;
                B = n;
                B = m < B ? m : B;
                B = l < B ? l : B;
                B = k < B ? k : B;
                C = z;
                C = y > C ? y : C;
                C = x > C ? x : C;
                C = w > C ? w : C;
                A = n;
                A = m > A ? m : A;
                A = l > A ? l : A;
                A = k > A ? k : A;
                var o = this._bounds;
                o.x = E;
                o.width = C - E;
                o.y = B;
                o.height = A - B;
                this._currentBounds = o;
                return o
            }
            ;
            i.prototype.containsPoint = function(l) {
                this.worldTransform.applyInverse(l, j);
                var o = this._width;
                var k = this._height;
                var m = -o * this.anchor.x;
                var n;
                if (j.x > m && j.x < m + o) {
                    n = -k * this.anchor.y;
                    if (j.y > n && j.y < n + k) {
                        return true
                    }
                }
                return false
            }
            ;
            i.prototype.destroy = function() {
                e.Sprite.prototype.destroy.call(this);
                this.tileScale = null;
                this._tileScaleOffset = null;
                this.tilePosition = null;
                this._uvs = null
            }
            ;
            i.fromFrame = function(n, l, k) {
                var m = e.utils.TextureCache[n];
                if (!m) {
                    throw new Error('The frameId "' + n + '" does not exist in the texture cache ' + this)
                }
                return new i(m,l,k)
            }
            ;
            i.fromImage = function(m, o, k, l, n) {
                return new i(e.Texture.fromImage(m, l, n),o,k)
            }
        }
        , {
            "../core": 28
        }],
        80: [function(i, j, h) {
            var f = i("../core")
              , g = f.DisplayObject
              , e = new f.Matrix();
            g.prototype._cacheAsBitmap = false;
            g.prototype._originalRenderWebGL = null;
            g.prototype._originalRenderCanvas = null;
            g.prototype._originalUpdateTransform = null;
            g.prototype._originalHitTest = null;
            g.prototype._originalDestroy = null;
            g.prototype._cachedSprite = null;
            Object.defineProperties(g.prototype, {
                cacheAsBitmap: {
                    get: function() {
                        return this._cacheAsBitmap
                    },
                    set: function(k) {
                        if (this._cacheAsBitmap === k) {
                            return
                        }
                        this._cacheAsBitmap = k;
                        if (k) {
                            this._originalRenderWebGL = this.renderWebGL;
                            this._originalRenderCanvas = this.renderCanvas;
                            this._originalUpdateTransform = this.updateTransform;
                            this._originalGetBounds = this.getBounds;
                            this._originalDestroy = this.destroy;
                            this._originalContainesPoint = this.containsPoint;
                            this.renderWebGL = this._renderCachedWebGL;
                            this.renderCanvas = this._renderCachedCanvas;
                            this.destroy = this._cacheAsBitmapDestroy
                        } else {
                            if (this._cachedSprite) {
                                this._destroyCachedDisplayObject()
                            }
                            this.renderWebGL = this._originalRenderWebGL;
                            this.renderCanvas = this._originalRenderCanvas;
                            this.getBounds = this._originalGetBounds;
                            this.destroy = this._originalDestroy;
                            this.updateTransform = this._originalUpdateTransform;
                            this.containsPoint = this._originalContainsPoint
                        }
                    }
                }
            });
            g.prototype._renderCachedWebGL = function(k) {
                this._initCachedDisplayObject(k);
                this._cachedSprite.worldAlpha = this.worldAlpha;
                k.setObjectRenderer(k.plugins.sprite);
                k.plugins.sprite.render(this._cachedSprite)
            }
            ;
            g.prototype._initCachedDisplayObject = function(q) {
                if (this._cachedSprite) {
                    return
                }
                q.currentRenderer.flush();
                var p = this.getLocalBounds().clone();
                if (this._filters) {
                    var r = this._filters[0].padding;
                    p.x -= r;
                    p.y -= r;
                    p.width += r * 2;
                    p.height += r * 2
                }
                var o = q.currentRenderTarget;
                var l = q.filterManager.filterStack;
                var n = new f.RenderTexture(q,p.width | 0,p.height | 0);
                var k = e;
                k.tx = -p.x;
                k.ty = -p.y;
                this.renderWebGL = this._originalRenderWebGL;
                n.render(this, k, true, true);
                q.setRenderTarget(o);
                q.filterManager.filterStack = l;
                this.renderWebGL = this._renderCachedWebGL;
                this.updateTransform = this.displayObjectUpdateTransform;
                this.getBounds = this._getCachedBounds;
                this._cachedSprite = new f.Sprite(n);
                this._cachedSprite.worldTransform = this.worldTransform;
                this._cachedSprite.anchor.x = -(p.x / p.width);
                this._cachedSprite.anchor.y = -(p.y / p.height);
                this.updateTransform();
                this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
            }
            ;
            g.prototype._renderCachedCanvas = function(k) {
                this._initCachedDisplayObjectCanvas(k);
                this._cachedSprite.worldAlpha = this.worldAlpha;
                this._cachedSprite.renderCanvas(k)
            }
            ;
            g.prototype._initCachedDisplayObjectCanvas = function(p) {
                if (this._cachedSprite) {
                    return
                }
                var o = this.getLocalBounds();
                var n = p.context;
                var l = new f.RenderTexture(p,o.width | 0,o.height | 0);
                var k = e;
                k.tx = -o.x;
                k.ty = -o.y;
                this.renderCanvas = this._originalRenderCanvas;
                l.render(this, k, true);
                p.context = n;
                this.renderCanvas = this._renderCachedCanvas;
                this.updateTransform = this.displayObjectUpdateTransform;
                this.getBounds = this._getCachedBounds;
                this._cachedSprite = new f.Sprite(l);
                this._cachedSprite.worldTransform = this.worldTransform;
                this._cachedSprite.anchor.x = -(o.x / o.width);
                this._cachedSprite.anchor.y = -(o.y / o.height);
                this.updateTransform();
                this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
            }
            ;
            g.prototype._getCachedBounds = function() {
                this._cachedSprite._currentBounds = null;
                return this._cachedSprite.getBounds()
            }
            ;
            g.prototype._destroyCachedDisplayObject = function() {
                this._cachedSprite._texture.destroy();
                this._cachedSprite = null
            }
            ;
            g.prototype._cacheAsBitmapDestroy = function() {
                this.cacheAsBitmap = false;
                this._originalDestroy()
            }
        }
        , {
            "../core": 28
        }],
        81: [function(g, h, f) {
            var e = g("../core");
            e.DisplayObject.prototype.name = null;
            e.Container.prototype.getChildByName = function(j) {
                for (var k = 0; k < this.children.length; k++) {
                    if (this.children[k].name === j) {
                        return this.children[k]
                    }
                }
                return null
            }
        }
        , {
            "../core": 28
        }],
        82: [function(g, h, f) {
            var e = g("../core");
            e.DisplayObject.prototype.getGlobalPosition = function(i) {
                i = i || new e.Point();
                if (this.parent) {
                    this.displayObjectUpdateTransform();
                    i.x = this.worldTransform.tx;
                    i.y = this.worldTransform.ty
                } else {
                    i.x = this.position.x;
                    i.y = this.position.y
                }
                return i
            }
        }
        , {
            "../core": 28
        }],
        83: [function(f, g, e) {
            f("./cacheAsBitmap");
            f("./getChildByName");
            f("./getGlobalPosition");
            g.exports = {
                MovieClip: f("./MovieClip"),
                TilingSprite: f("./TilingSprite"),
                BitmapText: f("./BitmapText")
            }
        }
        , {
            "./BitmapText": 77,
            "./MovieClip": 78,
            "./TilingSprite": 79,
            "./cacheAsBitmap": 80,
            "./getChildByName": 81,
            "./getGlobalPosition": 82
        }],
        84: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n", {
                    dimensions: {
                        type: "4fv",
                        value: new Float32Array([0, 0, 0, 0])
                    },
                    pixelSize: {
                        type: "1f",
                        value: 8
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                size: {
                    get: function() {
                        return this.uniforms.pixelSize.value
                    },
                    set: function(j) {
                        this.uniforms.pixelSize.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        85: [function(g, h, f) {
            var e = g("../../core")
              , j = g("../blur/BlurXFilter")
              , k = g("../blur/BlurYFilter");
            function i() {
                e.AbstractFilter.call(this);
                this.blurXFilter = new j();
                this.blurYFilter = new k();
                this.defaultFilter = new e.AbstractFilter()
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.applyFilter = function(o, m, l) {
                var n = o.filterManager.getRenderTarget(true);
                this.defaultFilter.applyFilter(o, m, l);
                this.blurXFilter.applyFilter(o, m, n);
                o.blendModeManager.setBlendMode(e.BLEND_MODES.SCREEN);
                this.blurYFilter.applyFilter(o, n, l);
                o.blendModeManager.setBlendMode(e.BLEND_MODES.NORMAL);
                o.filterManager.returnRenderTarget(n)
            }
            ;
            Object.defineProperties(i.prototype, {
                blur: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(l) {
                        this.blurXFilter.blur = this.blurYFilter.blur = l
                    }
                },
                blurX: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(l) {
                        this.blurXFilter.blur = l
                    }
                },
                blurY: {
                    get: function() {
                        return this.blurYFilter.blur
                    },
                    set: function(l) {
                        this.blurYFilter.blur = l
                    }
                }
            })
        }
        , {
            "../../core": 28,
            "../blur/BlurXFilter": 88,
            "../blur/BlurYFilter": 89
        }],
        86: [function(g, h, f) {
            var e = g("../../core");
            function i(k, j) {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    },
                    dirX: {
                        type: "1f",
                        value: k || 0
                    },
                    dirY: {
                        type: "1f",
                        value: j || 0
                    }
                });
                this.defaultFilter = new e.AbstractFilter();
                this.passes = 1;
                this.dirX = k || 0;
                this.dirY = j || 0;
                this.strength = 4
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.applyFilter = function(p, l, k, j) {
                var n = this.getShader(p);
                this.uniforms.strength.value = this.strength / 4 / this.passes * (l.frame.width / l.size.width);
                if (this.passes === 1) {
                    p.filterManager.applyFilter(n, l, k, j)
                } else {
                    var o = p.filterManager.getRenderTarget(true);
                    p.filterManager.applyFilter(n, l, o, j);
                    for (var m = 0; m < this.passes - 2; m++) {
                        p.filterManager.applyFilter(n, o, o, j)
                    }
                    p.filterManager.applyFilter(n, o, k, j);
                    p.filterManager.returnRenderTarget(o)
                }
            }
            ;
            Object.defineProperties(i.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(j) {
                        this.padding = j * 0.5;
                        this.strength = j
                    }
                },
                dirX: {
                    get: function() {
                        return this.dirX
                    },
                    set: function(j) {
                        this.uniforms.dirX.value = j
                    }
                },
                dirY: {
                    get: function() {
                        return this.dirY
                    },
                    set: function(j) {
                        this.uniforms.dirY.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        87: [function(g, h, f) {
            var e = g("../../core")
              , i = g("./BlurDirFilter");
            function j() {
                e.AbstractFilter.call(this);
                this.defaultFilter = new e.AbstractFilter();
                this.blurFilters = [new i(1,0), new i(-1,0), new i(0,1), new i(0,-1), new i(0.7,0.7), new i(-0.7,0.7), new i(0.7,-0.7), new i(-0.7,-0.7)]
            }
            j.prototype = Object.create(e.AbstractFilter.prototype);
            j.prototype.constructor = j;
            h.exports = j;
            j.prototype.applyFilter = function(n, l, k) {
                var m = n.filterManager.getRenderTarget(true);
                for (var o = 0; o < this.blurFilters.length; o++) {
                    this.blurFilters[o].applyFilter(n, l, m)
                }
                this.defaultFilter.applyFilter(n, m, k);
                n.filterManager.returnRenderTarget(m)
            }
            ;
            Object.defineProperties(j.prototype, {
                blur: {
                    get: function() {
                        return this.blurFilters[0].blur
                    },
                    set: function(l) {
                        this.padding = l * 0.5;
                        for (var k = 0; k < this.blurFilters.length; k++) {
                            this.blurFilters[k].blur = l
                        }
                    }
                },
                passes: {
                    get: function() {
                        return this.blurFilters[0].passes
                    },
                    set: function(l) {
                        for (var k = 0; k < this.blurFilters.length; k++) {
                            this.blurFilters[k].passes = l
                        }
                    }
                },
                blurX: {
                    get: function() {
                        return this.blurFilters[0].blur
                    },
                    set: function(k) {
                        this.blurFilters[0].blur = k;
                        this.blurFilters[1].blur = k;
                        this.blurFilters[4].blur = k * this.blurFilters[2].blur;
                        this.blurFilters[5].blur = k * this.blurFilters[2].blur;
                        this.blurFilters[6].blur = k * this.blurFilters[3].blur;
                        this.blurFilters[7].blur = k * this.blurFilters[3].blur
                    }
                },
                blurY: {
                    get: function() {
                        return this.blurYFilter.blur
                    },
                    set: function(k) {
                        this.blurFilters[2].blur = k;
                        this.blurFilters[3].blur = k;
                        this.blurFilters[4].blur = k * this.blurFilters[0].blur;
                        this.blurFilters[5].blur = k * this.blurFilters[0].blur;
                        this.blurFilters[6].blur = k * this.blurFilters[1].blur;
                        this.blurFilters[7].blur = k * this.blurFilters[1].blur
                    }
                }
            })
        }
        , {
            "../../core": 28,
            "./BlurDirFilter": 86
        }],
        88: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    }
                });
                this.passes = 1;
                this.strength = 4
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.applyFilter = function(q, r, j, o) {
                var p = this.getShader(q);
                this.uniforms.strength.value = this.strength / 4 / this.passes * (r.frame.width / r.size.width);
                if (this.passes === 1) {
                    q.filterManager.applyFilter(p, r, j, o)
                } else {
                    var n = q.filterManager.getRenderTarget(true);
                    var m = r;
                    var k = n;
                    for (var l = 0; l < this.passes - 1; l++) {
                        q.filterManager.applyFilter(p, m, k, o);
                        var s = k;
                        k = m;
                        m = s
                    }
                    q.filterManager.applyFilter(p, m, j, o);
                    q.filterManager.returnRenderTarget(n)
                }
            }
            ;
            Object.defineProperties(i.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(j) {
                        this.padding = j * 0.5;
                        this.strength = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        89: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f",
                        value: 1
                    }
                });
                this.passes = 1;
                this.strength = 4
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.applyFilter = function(q, r, j, o) {
                var p = this.getShader(q);
                this.uniforms.strength.value = this.strength / 4 / this.passes * (r.frame.height / r.size.height);
                if (this.passes === 1) {
                    q.filterManager.applyFilter(p, r, j, o)
                } else {
                    var n = q.filterManager.getRenderTarget(true);
                    var m = r;
                    var k = n;
                    for (var l = 0; l < this.passes - 1; l++) {
                        q.filterManager.applyFilter(p, m, k, o);
                        var s = k;
                        k = m;
                        m = s
                    }
                    q.filterManager.applyFilter(p, m, j, o);
                    q.filterManager.returnRenderTarget(n)
                }
            }
            ;
            Object.defineProperties(i.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(j) {
                        this.padding = j * 0.5;
                        this.strength = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        90: [function(h, i, g) {
            var f = h("../../core");
            function e() {
                f.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    delta: {
                        type: "v2",
                        value: {
                            x: 0.1,
                            y: 0
                        }
                    }
                })
            }
            e.prototype = Object.create(f.AbstractFilter.prototype);
            e.prototype.constructor = e;
            i.exports = e
        }
        , {
            "../../core": 28
        }],
        91: [function(g, i, f) {
            var e = g("../../core");
            function h() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float m[24];\n\nuniform vec4 d;\n\nvoid main(void)\n{\n    \n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n\tgl_FragColor.r = m[0] * c.r + m[1] * c.g + m[2] * c.b + m[3] * c.a + m[4];\n\tgl_FragColor.g = m[5] * c.r + m[6] * c.g + m[7] * c.b + m[8] * c.a + m[9];\n\tgl_FragColor.b = m[10] * c.r + m[11] * c.g + m[12] * c.b + m[13] * c.a + m[14];\n\tgl_FragColor.a = c.a;\n}\n", {
                    m: {
                        type: "1fv",
                        value: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
                    }
                })
            }
            h.prototype = Object.create(e.AbstractFilter.prototype);
            h.prototype.constructor = h;
            i.exports = h;
            h.prototype._loadMatrix = function(k, j) {
                j = !!j;
                var l = k;
                if (j) {
                    this._multiply(l, this.uniforms.m.value, k);
                    l = this._colorMatrix(l)
                }
                this.uniforms.m.value = l
            }
            ;
            h.prototype._multiply = function(l, k, j) {
                l[0] = k[0] * j[0] + k[1] * j[5] + k[2] * j[10] + k[3] * j[15] + k[4] * j[20];
                l[1] = k[0] * j[1] + k[1] * j[6] + k[2] * j[11] + k[3] * j[16] + k[4] * j[21];
                l[2] = k[0] * j[2] + k[1] * j[7] + k[2] * j[12] + k[3] * j[17] + k[4] * j[22];
                l[3] = k[0] * j[3] + k[1] * j[8] + k[2] * j[13] + k[3] * j[18] + k[4] * j[23];
                l[4] = k[0] * j[4] + k[1] * j[9] + k[2] * j[14] + k[3] * j[19] + k[4] * j[24];
                l[5] = k[5] * j[0] + k[6] * j[5] + k[7] * j[10] + k[8] * j[15] + k[9] * j[20];
                l[6] = k[5] * j[1] + k[6] * j[6] + k[7] * j[11] + k[8] * j[16] + k[9] * j[21];
                l[7] = k[5] * j[2] + k[6] * j[7] + k[7] * j[12] + k[8] * j[17] + k[9] * j[22];
                l[8] = k[5] * j[3] + k[6] * j[8] + k[7] * j[13] + k[8] * j[18] + k[9] * j[23];
                l[9] = k[5] * j[4] + k[6] * j[9] + k[7] * j[14] + k[8] * j[19] + k[9] * j[24];
                l[10] = k[10] * j[0] + k[11] * j[5] + k[12] * j[10] + k[13] * j[15] + k[14] * j[20];
                l[11] = k[10] * j[1] + k[11] * j[6] + k[12] * j[11] + k[13] * j[16] + k[14] * j[21];
                l[12] = k[10] * j[2] + k[11] * j[7] + k[12] * j[12] + k[13] * j[17] + k[14] * j[22];
                l[13] = k[10] * j[3] + k[11] * j[8] + k[12] * j[13] + k[13] * j[18] + k[14] * j[23];
                l[14] = k[10] * j[4] + k[11] * j[9] + k[12] * j[14] + k[13] * j[19] + k[14] * j[24];
                l[15] = k[15] * j[0] + k[16] * j[5] + k[17] * j[10] + k[18] * j[15] + k[19] * j[20];
                l[16] = k[15] * j[1] + k[16] * j[6] + k[17] * j[11] + k[18] * j[16] + k[19] * j[21];
                l[17] = k[15] * j[2] + k[16] * j[7] + k[17] * j[12] + k[18] * j[17] + k[19] * j[22];
                l[18] = k[15] * j[3] + k[16] * j[8] + k[17] * j[13] + k[18] * j[18] + k[19] * j[23];
                l[19] = k[15] * j[4] + k[16] * j[9] + k[17] * j[14] + k[18] * j[19] + k[19] * j[24];
                l[20] = k[20] * j[0] + k[21] * j[5] + k[22] * j[10] + k[23] * j[15] + k[24] * j[20];
                l[21] = k[20] * j[1] + k[21] * j[6] + k[22] * j[11] + k[23] * j[16] + k[24] * j[21];
                l[22] = k[20] * j[2] + k[21] * j[7] + k[22] * j[12] + k[23] * j[17] + k[24] * j[22];
                l[23] = k[20] * j[3] + k[21] * j[8] + k[22] * j[13] + k[23] * j[18] + k[24] * j[23];
                l[24] = k[20] * j[4] + k[21] * j[9] + k[22] * j[14] + k[23] * j[19] + k[24] * j[24];
                return l
            }
            ;
            h.prototype._colorMatrix = function(k) {
                var j = new Float32Array(k);
                j[4] /= 255;
                j[9] /= 255;
                j[14] /= 255;
                j[19] /= 255;
                return j
            }
            ;
            h.prototype.brightness = function(j, l) {
                var k = [j, 0, 0, 0, 0, 0, j, 0, 0, 0, 0, 0, j, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(k, l)
            }
            ;
            h.prototype.greyscale = function(l, k) {
                var j = [l, l, l, 0, 0, l, l, l, 0, 0, l, l, l, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.blackAndWhite = function(k) {
                var j = [0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.hue = function(o, l) {
                o = (o || 0) / 180 * Math.PI;
                var p = Math.cos(o)
                  , k = Math.sin(o);
                var n = 0.213
                  , m = 0.715
                  , q = 0.072;
                var j = [n + p * (1 - n) + k * (-n), m + p * (-m) + k * (-m), q + p * (-q) + k * (1 - q), 0, 0, n + p * (-n) + k * (0.143), m + p * (1 - m) + k * (0.14), q + p * (-q) + k * (-0.283), 0, 0, n + p * (-n) + k * (-(1 - n)), m + p * (-m) + k * (m), q + p * (1 - q) + k * (q), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, l)
            }
            ;
            h.prototype.contrast = function(m, l) {
                var k = (m || 0) + 1;
                var n = -128 * (k - 1);
                var j = [k, 0, 0, 0, n, 0, k, 0, 0, n, 0, 0, k, 0, n, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, l)
            }
            ;
            h.prototype.saturation = function(m, l) {
                var j = (m || 0) * 2 / 3 + 1;
                var n = ((j - 1) * -0.5);
                var k = [j, n, n, 0, 0, n, j, n, 0, 0, n, n, j, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(k, l)
            }
            ;
            h.prototype.desaturate = function(j) {
                this.saturation(-1)
            }
            ;
            h.prototype.negative = function(k) {
                var j = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.sepia = function(k) {
                var j = [0.393, 0.7689999, 0.18899999, 0, 0, 0.349, 0.6859999, 0.16799999, 0, 0, 0.272, 0.5339999, 0.13099999, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.technicolor = function(k) {
                var j = [1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 11.793603434377337, -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -70.35205161461398, -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.polaroid = function(k) {
                var j = [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.toBGR = function(k) {
                var j = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.kodachrome = function(k) {
                var j = [1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502, -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203, -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.browni = function(k) {
                var j = [0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 47.43192855600873, -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, -36.96841498319127, 0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.vintage = function(k) {
                var j = [0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123, 0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591, 0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.colorTone = function(r, o, n, s, k) {
                r = r || 0.2;
                o = o || 0.15;
                n = n || 16770432;
                s = s || 3375104;
                var u = ((n >> 16) & 255) / 255;
                var m = ((n >> 8) & 255) / 255;
                var p = (n & 255) / 255;
                var q = ((s >> 16) & 255) / 255;
                var j = ((s >> 8) & 255) / 255;
                var l = (s & 255) / 255;
                var t = [0.3, 0.59, 0.11, 0, 0, u, m, p, r, 0, q, j, l, o, 0, u - q, m - j, p - l, 0, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(t, k)
            }
            ;
            h.prototype.night = function(j, l) {
                j = j || 0.1;
                var k = [j * (-2), -j, 0, 0, 0, -j, 0, j, 0, 0, 0, j, j * 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(k, l)
            }
            ;
            h.prototype.predator = function(l, k) {
                var j = [11.224130630493164 * l, -4.794486999511719 * l, -2.8746118545532227 * l, 0 * l, 0.40342438220977783 * l, -3.6330697536468506 * l, 9.193157196044922 * l, -2.951810836791992 * l, 0 * l, -1.316135048866272 * l, -3.2184197902679443 * l, -4.2375030517578125 * l, 7.476448059082031 * l, 0 * l, 0.8044459223747253 * l, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.lsd = function(k) {
                var j = [2, -0.4, 0.5, 0, 0, -0.5, 2, -0.4, 0, 0, -0.4, -0.5, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, k)
            }
            ;
            h.prototype.reset = function() {
                var j = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
                this._loadMatrix(j, false)
            }
            ;
            Object.defineProperties(h.prototype, {
                matrix: {
                    get: function() {
                        return this.uniforms.m.value
                    },
                    set: function(j) {
                        this.uniforms.m.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        92: [function(h, i, g) {
            var f = h("../../core");
            function e() {
                f.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n", {
                    step: {
                        type: "1f",
                        value: 5
                    }
                })
            }
            e.prototype = Object.create(f.AbstractFilter.prototype);
            e.prototype.constructor = e;
            i.exports = e;
            Object.defineProperties(e.prototype, {
                step: {
                    get: function() {
                        return this.uniforms.step.value
                    },
                    set: function(j) {
                        this.uniforms.step.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        93: [function(h, i, g) {
            var f = h("../../core");
            function e(k, l, j) {
                f.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n", {
                    matrix: {
                        type: "1fv",
                        value: new Float32Array(k)
                    },
                    texelSize: {
                        type: "2v",
                        value: {
                            x: 1 / l,
                            y: 1 / j
                        }
                    }
                })
            }
            e.prototype = Object.create(f.AbstractFilter.prototype);
            e.prototype.constructor = e;
            i.exports = e;
            Object.defineProperties(e.prototype, {
                matrix: {
                    get: function() {
                        return this.uniforms.matrix.value
                    },
                    set: function(j) {
                        this.uniforms.matrix.value = new Float32Array(j)
                    }
                },
                width: {
                    get: function() {
                        return 1 / this.uniforms.texelSize.value.x
                    },
                    set: function(j) {
                        this.uniforms.texelSize.value.x = 1 / j
                    }
                },
                height: {
                    get: function() {
                        return 1 / this.uniforms.texelSize.value.y
                    },
                    set: function(j) {
                        this.uniforms.texelSize.value.y = 1 / j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        94: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i
        }
        , {
            "../../core": 28
        }],
        95: [function(g, i, f) {
            var e = g("../../core");
            function h(j) {
                var k = new e.math.Matrix();
                j.renderable = false;
                e.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 original =  texture2D(uSampler, vTextureCoord);\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n", {
                    mapSampler: {
                        type: "sampler2D",
                        value: j.texture
                    },
                    otherMatrix: {
                        type: "mat3",
                        value: k.toArray(true)
                    },
                    scale: {
                        type: "v2",
                        value: {
                            x: 1,
                            y: 1
                        }
                    }
                });
                this.maskSprite = j;
                this.maskMatrix = k;
                this.scale = new e.math.Point(20,20)
            }
            h.prototype = Object.create(e.AbstractFilter.prototype);
            h.prototype.constructor = h;
            i.exports = h;
            h.prototype.applyFilter = function(n, l, k) {
                var j = n.filterManager;
                j.calculateMappedMatrix(l.frame, this.maskSprite, this.maskMatrix);
                this.uniforms.otherMatrix.value = this.maskMatrix.toArray(true);
                this.uniforms.scale.value.x = this.scale.x * (1 / l.frame.width);
                this.uniforms.scale.value.y = this.scale.y * (1 / l.frame.height);
                var m = this.getShader(n);
                j.applyFilter(m, l, k)
            }
            ;
            Object.defineProperties(h.prototype, {
                map: {
                    get: function() {
                        return this.uniforms.mapSampler.value
                    },
                    set: function(j) {
                        this.uniforms.mapSampler.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        96: [function(h, i, g) {
            var e = h("../../core");
            function f() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n", {
                    scale: {
                        type: "1f",
                        value: 1
                    },
                    angle: {
                        type: "1f",
                        value: 5
                    },
                    dimensions: {
                        type: "4fv",
                        value: [0, 0, 0, 0]
                    }
                })
            }
            f.prototype = Object.create(e.AbstractFilter.prototype);
            f.prototype.constructor = f;
            i.exports = f;
            Object.defineProperties(f.prototype, {
                scale: {
                    get: function() {
                        return this.uniforms.scale.value
                    },
                    set: function(j) {
                        this.uniforms.scale.value = j
                    }
                },
                angle: {
                    get: function() {
                        return this.uniforms.angle.value
                    },
                    set: function(j) {
                        this.uniforms.angle.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        97: [function(h, i, g) {
            var f = h("../../core");
            function e() {
                f.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n", {
                    blur: {
                        type: "1f",
                        value: 1 / 512
                    },
                    color: {
                        type: "c",
                        value: [0, 0, 0]
                    },
                    alpha: {
                        type: "1f",
                        value: 0.7
                    },
                    offset: {
                        type: "2f",
                        value: [5, 5]
                    },
                    strength: {
                        type: "1f",
                        value: 1
                    }
                });
                this.passes = 1;
                this.strength = 4
            }
            e.prototype = Object.create(f.AbstractFilter.prototype);
            e.prototype.constructor = e;
            i.exports = e;
            e.prototype.applyFilter = function(q, r, j, o) {
                var p = this.getShader(q);
                this.uniforms.strength.value = this.strength / 4 / this.passes * (r.frame.height / r.size.height);
                if (this.passes === 1) {
                    q.filterManager.applyFilter(p, r, j, o)
                } else {
                    var n = q.filterManager.getRenderTarget(true);
                    var m = r;
                    var k = n;
                    for (var l = 0; l < this.passes - 1; l++) {
                        q.filterManager.applyFilter(p, m, k, o);
                        var s = k;
                        k = m;
                        m = s
                    }
                    q.filterManager.applyFilter(p, m, j, o);
                    q.filterManager.returnRenderTarget(n)
                }
            }
            ;
            Object.defineProperties(e.prototype, {
                blur: {
                    get: function() {
                        return this.strength
                    },
                    set: function(j) {
                        this.padding = j * 0.5;
                        this.strength = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        98: [function(h, i, g) {
            var f = h("../../core")
              , j = h("../blur/BlurXFilter")
              , e = h("./BlurYTintFilter");
            function k() {
                f.AbstractFilter.call(this);
                this.blurXFilter = new j();
                this.blurYTintFilter = new e();
                this.defaultFilter = new f.AbstractFilter();
                this.padding = 30;
                this._dirtyPosition = true;
                this._angle = 45 * Math.PI / 180;
                this._distance = 10;
                this.alpha = 0.75;
                this.hideObject = false;
                this.blendMode = f.BLEND_MODES.MULTIPLY
            }
            k.prototype = Object.create(f.AbstractFilter.prototype);
            k.prototype.constructor = k;
            i.exports = k;
            k.prototype.applyFilter = function(o, m, l) {
                var n = o.filterManager.getRenderTarget(true);
                if (this._dirtyPosition) {
                    this._dirtyPosition = false;
                    this.blurYTintFilter.uniforms.offset.value[0] = Math.sin(this._angle) * this._distance;
                    this.blurYTintFilter.uniforms.offset.value[1] = Math.cos(this._angle) * this._distance
                }
                this.blurXFilter.applyFilter(o, m, n);
                o.blendModeManager.setBlendMode(this.blendMode);
                this.blurYTintFilter.applyFilter(o, n, l);
                o.blendModeManager.setBlendMode(f.BLEND_MODES.NORMAL);
                if (!this.hideObject) {
                    this.defaultFilter.applyFilter(o, m, l)
                }
                o.filterManager.returnRenderTarget(n)
            }
            ;
            Object.defineProperties(k.prototype, {
                blur: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(l) {
                        this.blurXFilter.blur = this.blurYTintFilter.blur = l
                    }
                },
                blurX: {
                    get: function() {
                        return this.blurXFilter.blur
                    },
                    set: function(l) {
                        this.blurXFilter.blur = l
                    }
                },
                blurY: {
                    get: function() {
                        return this.blurYTintFilter.blur
                    },
                    set: function(l) {
                        this.blurYTintFilter.blur = l
                    }
                },
                color: {
                    get: function() {
                        return f.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value)
                    },
                    set: function(l) {
                        this.blurYTintFilter.uniforms.color.value = f.utils.hex2rgb(l)
                    }
                },
                alpha: {
                    get: function() {
                        return this.blurYTintFilter.uniforms.alpha.value
                    },
                    set: function(l) {
                        this.blurYTintFilter.uniforms.alpha.value = l
                    }
                },
                distance: {
                    get: function() {
                        return this._distance
                    },
                    set: function(l) {
                        this._dirtyPosition = true;
                        this._distance = l
                    }
                },
                angle: {
                    get: function() {
                        return this._angle
                    },
                    set: function(l) {
                        this._dirtyPosition = true;
                        this._angle = l
                    }
                }
            })
        }
        , {
            "../../core": 28,
            "../blur/BlurXFilter": 88,
            "./BlurYTintFilter": 97
        }],
        99: [function(h, i, f) {
            var e = h("../../core");
            function g() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n", {
                    gray: {
                        type: "1f",
                        value: 1
                    }
                })
            }
            g.prototype = Object.create(e.AbstractFilter.prototype);
            g.prototype.constructor = g;
            i.exports = g;
            Object.defineProperties(g.prototype, {
                gray: {
                    get: function() {
                        return this.uniforms.gray.value
                    },
                    set: function(j) {
                        this.uniforms.gray.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        100: [function(f, g, e) {
            g.exports = {
                AbstractFilter: f("../core/renderers/webgl/filters/AbstractFilter"),
                FXAAFilter: f("../core/renderers/webgl/filters/FXAAFilter"),
                SpriteMaskFilter: f("../core/renderers/webgl/filters/SpriteMaskFilter"),
                AsciiFilter: f("./ascii/AsciiFilter"),
                BloomFilter: f("./bloom/BloomFilter"),
                BlurFilter: f("./blur/BlurFilter"),
                BlurXFilter: f("./blur/BlurXFilter"),
                BlurYFilter: f("./blur/BlurYFilter"),
                BlurDirFilter: f("./blur/BlurDirFilter"),
                ColorMatrixFilter: f("./color/ColorMatrixFilter"),
                ColorStepFilter: f("./color/ColorStepFilter"),
                ConvolutionFilter: f("./convolution/ConvolutionFilter"),
                CrossHatchFilter: f("./crosshatch/CrossHatchFilter"),
                DisplacementFilter: f("./displacement/DisplacementFilter"),
                DotScreenFilter: f("./dot/DotScreenFilter"),
                GrayFilter: f("./gray/GrayFilter"),
                DropShadowFilter: f("./dropshadow/DropShadowFilter"),
                InvertFilter: f("./invert/InvertFilter"),
                NoiseFilter: f("./noise/NoiseFilter"),
                NormalMapFilter: f("./normal/NormalMapFilter"),
                PixelateFilter: f("./pixelate/PixelateFilter"),
                RGBSplitFilter: f("./rgb/RGBSplitFilter"),
                ShockwaveFilter: f("./shockwave/ShockwaveFilter"),
                SepiaFilter: f("./sepia/SepiaFilter"),
                SmartBlurFilter: f("./blur/SmartBlurFilter"),
                TiltShiftFilter: f("./tiltshift/TiltShiftFilter"),
                TiltShiftXFilter: f("./tiltshift/TiltShiftXFilter"),
                TiltShiftYFilter: f("./tiltshift/TiltShiftYFilter"),
                TwistFilter: f("./twist/TwistFilter")
            }
        }
        , {
            "../core/renderers/webgl/filters/AbstractFilter": 48,
            "../core/renderers/webgl/filters/FXAAFilter": 49,
            "../core/renderers/webgl/filters/SpriteMaskFilter": 50,
            "./ascii/AsciiFilter": 84,
            "./bloom/BloomFilter": 85,
            "./blur/BlurDirFilter": 86,
            "./blur/BlurFilter": 87,
            "./blur/BlurXFilter": 88,
            "./blur/BlurYFilter": 89,
            "./blur/SmartBlurFilter": 90,
            "./color/ColorMatrixFilter": 91,
            "./color/ColorStepFilter": 92,
            "./convolution/ConvolutionFilter": 93,
            "./crosshatch/CrossHatchFilter": 94,
            "./displacement/DisplacementFilter": 95,
            "./dot/DotScreenFilter": 96,
            "./dropshadow/DropShadowFilter": 98,
            "./gray/GrayFilter": 99,
            "./invert/InvertFilter": 101,
            "./noise/NoiseFilter": 102,
            "./normal/NormalMapFilter": 103,
            "./pixelate/PixelateFilter": 104,
            "./rgb/RGBSplitFilter": 105,
            "./sepia/SepiaFilter": 106,
            "./shockwave/ShockwaveFilter": 107,
            "./tiltshift/TiltShiftFilter": 109,
            "./tiltshift/TiltShiftXFilter": 110,
            "./tiltshift/TiltShiftYFilter": 111,
            "./twist/TwistFilter": 112
        }],
        101: [function(h, i, g) {
            var e = h("../../core");
            function f() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n", {
                    invert: {
                        type: "1f",
                        value: 1
                    }
                })
            }
            f.prototype = Object.create(e.AbstractFilter.prototype);
            f.prototype.constructor = f;
            i.exports = f;
            Object.defineProperties(f.prototype, {
                invert: {
                    get: function() {
                        return this.uniforms.invert.value
                    },
                    set: function(j) {
                        this.uniforms.invert.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        102: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n", {
                    noise: {
                        type: "1f",
                        value: 0.5
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                noise: {
                    get: function() {
                        return this.uniforms.noise.value
                    },
                    set: function(j) {
                        this.uniforms.noise.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        103: [function(g, h, f) {
            var e = g("../../core");
            function i(j) {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying float vColor;\n\nuniform sampler2D displacementMap;\nuniform sampler2D uSampler;\n\nuniform vec4 dimensions;\n\nconst vec2 Resolution = vec2(1.0,1.0);      //resolution of screen\nuniform vec3 LightPos;    //light position, normalized\nconst vec4 LightColor = vec4(1.0, 1.0, 1.0, 1.0);      //light RGBA -- alpha is intensity\nconst vec4 AmbientColor = vec4(1.0, 1.0, 1.0, 0.5);    //ambient RGBA -- alpha is intensity\nconst vec3 Falloff = vec3(0.0, 1.0, 0.2);         //attenuation coefficients\n\nuniform vec3 LightDir; // = vec3(1.0, 0.0, 1.0);\n\nuniform vec2 mapDimensions; // = vec2(256.0, 256.0);\n\n\nvoid main(void)\n{\n    vec2 mapCords = vTextureCoord.xy;\n\n    vec4 color = texture2D(uSampler, vTextureCoord.st);\n    vec3 nColor = texture2D(displacementMap, vTextureCoord.st).rgb;\n\n\n    mapCords *= vec2(dimensions.x/512.0, dimensions.y/512.0);\n\n    mapCords.y *= -1.0;\n    mapCords.y += 1.0;\n\n    // RGBA of our diffuse color\n    vec4 DiffuseColor = texture2D(uSampler, vTextureCoord);\n\n    // RGB of our normal map\n    vec3 NormalMap = texture2D(displacementMap, mapCords).rgb;\n\n    // The delta position of light\n    // vec3 LightDir = vec3(LightPos.xy - (gl_FragCoord.xy / Resolution.xy), LightPos.z);\n    vec3 LightDir = vec3(LightPos.xy - (mapCords.xy), LightPos.z);\n\n    // Correct for aspect ratio\n    // LightDir.x *= Resolution.x / Resolution.y;\n\n    // Determine distance (used for attenuation) BEFORE we normalize our LightDir\n    float D = length(LightDir);\n\n    // normalize our vectors\n    vec3 N = normalize(NormalMap * 2.0 - 1.0);\n    vec3 L = normalize(LightDir);\n\n    // Pre-multiply light color with intensity\n    // Then perform 'N dot L' to determine our diffuse term\n    vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N, L), 0.0);\n\n    // pre-multiply ambient color with intensity\n    vec3 Ambient = AmbientColor.rgb * AmbientColor.a;\n\n    // calculate attenuation\n    float Attenuation = 1.0 / ( Falloff.x + (Falloff.y*D) + (Falloff.z*D*D) );\n\n    // the calculation which brings it all together\n    vec3 Intensity = Ambient + Diffuse * Attenuation;\n    vec3 FinalColor = DiffuseColor.rgb * Intensity;\n    gl_FragColor = vColor * vec4(FinalColor, DiffuseColor.a);\n\n    // gl_FragColor = vec4(1.0, 0.0, 0.0, Attenuation); // vColor * vec4(FinalColor, DiffuseColor.a);\n\n/*\n    // normalise color\n    vec3 normal = normalize(nColor * 2.0 - 1.0);\n\n    vec3 deltaPos = vec3( (light.xy - gl_FragCoord.xy) / resolution.xy, light.z );\n\n    float lambert = clamp(dot(normal, lightDir), 0.0, 1.0);\n\n    float d = sqrt(dot(deltaPos, deltaPos));\n    float att = 1.0 / ( attenuation.x + (attenuation.y*d) + (attenuation.z*d*d) );\n\n    vec3 result = (ambientColor * ambientIntensity) + (lightColor.rgb * lambert) * att;\n    result *= color.rgb;\n\n    gl_FragColor = vec4(result, 1.0);\n*/\n}\n", {
                    displacementMap: {
                        type: "sampler2D",
                        value: j
                    },
                    scale: {
                        type: "2f",
                        value: {
                            x: 15,
                            y: 15
                        }
                    },
                    offset: {
                        type: "2f",
                        value: {
                            x: 0,
                            y: 0
                        }
                    },
                    mapDimensions: {
                        type: "2f",
                        value: {
                            x: 1,
                            y: 1
                        }
                    },
                    dimensions: {
                        type: "4f",
                        value: [0, 0, 0, 0]
                    },
                    LightPos: {
                        type: "3f",
                        value: [0, 1, 0]
                    }
                });
                j.baseTexture._powerOf2 = true;
                if (j.baseTexture.hasLoaded) {
                    this.onTextureLoaded()
                } else {
                    j.baseTexture.once("loaded", this.onTextureLoaded, this)
                }
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.onTextureLoaded = function() {
                this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
                this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height
            }
            ;
            Object.defineProperties(i.prototype, {
                map: {
                    get: function() {
                        return this.uniforms.displacementMap.value
                    },
                    set: function(j) {
                        this.uniforms.displacementMap.value = j
                    }
                },
                scale: {
                    get: function() {
                        return this.uniforms.scale.value
                    },
                    set: function(j) {
                        this.uniforms.scale.value = j
                    }
                },
                offset: {
                    get: function() {
                        return this.uniforms.offset.value
                    },
                    set: function(j) {
                        this.uniforms.offset.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        104: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n", {
                    dimensions: {
                        type: "4fv",
                        value: new Float32Array([0, 0, 0, 0])
                    },
                    pixelSize: {
                        type: "v2",
                        value: {
                            x: 10,
                            y: 10
                        }
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                size: {
                    get: function() {
                        return this.uniforms.pixelSize.value
                    },
                    set: function(j) {
                        this.uniforms.pixelSize.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        105: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n", {
                    red: {
                        type: "v2",
                        value: {
                            x: 20,
                            y: 20
                        }
                    },
                    green: {
                        type: "v2",
                        value: {
                            x: -20,
                            y: 20
                        }
                    },
                    blue: {
                        type: "v2",
                        value: {
                            x: 20,
                            y: -20
                        }
                    },
                    dimensions: {
                        type: "4fv",
                        value: [0, 0, 0, 0]
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                red: {
                    get: function() {
                        return this.uniforms.red.value
                    },
                    set: function(j) {
                        this.uniforms.red.value = j
                    }
                },
                green: {
                    get: function() {
                        return this.uniforms.green.value
                    },
                    set: function(j) {
                        this.uniforms.green.value = j
                    }
                },
                blue: {
                    get: function() {
                        return this.uniforms.blue.value
                    },
                    set: function(j) {
                        this.uniforms.blue.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        106: [function(h, i, f) {
            var e = h("../../core");
            function g() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n", {
                    sepia: {
                        type: "1f",
                        value: 1
                    }
                })
            }
            g.prototype = Object.create(e.AbstractFilter.prototype);
            g.prototype.constructor = g;
            i.exports = g;
            Object.defineProperties(g.prototype, {
                sepia: {
                    get: function() {
                        return this.uniforms.sepia.value
                    },
                    set: function(j) {
                        this.uniforms.sepia.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        107: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n", {
                    center: {
                        type: "v2",
                        value: {
                            x: 0.5,
                            y: 0.5
                        }
                    },
                    params: {
                        type: "v3",
                        value: {
                            x: 10,
                            y: 0.8,
                            z: 0.1
                        }
                    },
                    time: {
                        type: "1f",
                        value: 0
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                center: {
                    get: function() {
                        return this.uniforms.center.value
                    },
                    set: function(j) {
                        this.uniforms.center.value = j
                    }
                },
                params: {
                    get: function() {
                        return this.uniforms.params.value
                    },
                    set: function(j) {
                        this.uniforms.params.value = j
                    }
                },
                time: {
                    get: function() {
                        return this.uniforms.time.value
                    },
                    set: function(j) {
                        this.uniforms.time.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        108: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    blur: {
                        type: "1f",
                        value: 100
                    },
                    gradientBlur: {
                        type: "1f",
                        value: 600
                    },
                    start: {
                        type: "v2",
                        value: {
                            x: 0,
                            y: window.innerHeight / 2
                        }
                    },
                    end: {
                        type: "v2",
                        value: {
                            x: 600,
                            y: window.innerHeight / 2
                        }
                    },
                    delta: {
                        type: "v2",
                        value: {
                            x: 30,
                            y: 30
                        }
                    },
                    texSize: {
                        type: "v2",
                        value: {
                            x: window.innerWidth,
                            y: window.innerHeight
                        }
                    }
                });
                this.updateDelta()
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype.updateDelta = function() {
                this.uniforms.delta.value.x = 0;
                this.uniforms.delta.value.y = 0
            }
            ;
            Object.defineProperties(i.prototype, {
                blur: {
                    get: function() {
                        return this.uniforms.blur.value
                    },
                    set: function(j) {
                        this.uniforms.blur.value = j
                    }
                },
                gradientBlur: {
                    get: function() {
                        return this.uniforms.gradientBlur.value
                    },
                    set: function(j) {
                        this.uniforms.gradientBlur.value = j
                    }
                },
                start: {
                    get: function() {
                        return this.uniforms.start.value
                    },
                    set: function(j) {
                        this.uniforms.start.value = j;
                        this.updateDelta()
                    }
                },
                end: {
                    get: function() {
                        return this.uniforms.end.value
                    },
                    set: function(j) {
                        this.uniforms.end.value = j;
                        this.updateDelta()
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        109: [function(g, i, f) {
            var e = g("../../core")
              , j = g("./TiltShiftXFilter")
              , k = g("./TiltShiftYFilter");
            function h() {
                e.AbstractFilter.call(this);
                this.tiltShiftXFilter = new j();
                this.tiltShiftYFilter = new k()
            }
            h.prototype = Object.create(e.AbstractFilter.prototype);
            h.prototype.constructor = h;
            i.exports = h;
            h.prototype.applyFilter = function(o, m, l) {
                var n = o.filterManager.getRenderTarget(true);
                this.tiltShiftXFilter.applyFilter(o, m, n);
                this.tiltShiftYFilter.applyFilter(o, n, l);
                o.filterManager.returnRenderTarget(n)
            }
            ;
            Object.defineProperties(h.prototype, {
                blur: {
                    get: function() {
                        return this.tiltShiftXFilter.blur
                    },
                    set: function(l) {
                        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = l
                    }
                },
                gradientBlur: {
                    get: function() {
                        return this.tiltShiftXFilter.gradientBlur
                    },
                    set: function(l) {
                        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = l
                    }
                },
                start: {
                    get: function() {
                        return this.tiltShiftXFilter.start
                    },
                    set: function(l) {
                        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = l
                    }
                },
                end: {
                    get: function() {
                        return this.tiltShiftXFilter.end
                    },
                    set: function(l) {
                        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = l
                    }
                }
            })
        }
        , {
            "../../core": 28,
            "./TiltShiftXFilter": 110,
            "./TiltShiftYFilter": 111
        }],
        110: [function(f, g, e) {
            var i = f("./TiltShiftAxisFilter");
            function h() {
                i.call(this)
            }
            h.prototype = Object.create(i.prototype);
            h.prototype.constructor = h;
            g.exports = h;
            h.prototype.updateDelta = function() {
                var k = this.uniforms.end.value.x - this.uniforms.start.value.x;
                var j = this.uniforms.end.value.y - this.uniforms.start.value.y;
                var l = Math.sqrt(k * k + j * j);
                this.uniforms.delta.value.x = k / l;
                this.uniforms.delta.value.y = j / l
            }
        }
        , {
            "./TiltShiftAxisFilter": 108
        }],
        111: [function(f, g, e) {
            var h = f("./TiltShiftAxisFilter");
            function i() {
                h.call(this)
            }
            i.prototype = Object.create(h.prototype);
            i.prototype.constructor = i;
            g.exports = i;
            i.prototype.updateDelta = function() {
                var k = this.uniforms.end.value.x - this.uniforms.start.value.x;
                var j = this.uniforms.end.value.y - this.uniforms.start.value.y;
                var l = Math.sqrt(k * k + j * j);
                this.uniforms.delta.value.x = -j / l;
                this.uniforms.delta.value.y = k / l
            }
        }
        , {
            "./TiltShiftAxisFilter": 108
        }],
        112: [function(g, h, f) {
            var e = g("../../core");
            function i() {
                e.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n", {
                    radius: {
                        type: "1f",
                        value: 0.5
                    },
                    angle: {
                        type: "1f",
                        value: 5
                    },
                    offset: {
                        type: "v2",
                        value: {
                            x: 0.5,
                            y: 0.5
                        }
                    }
                })
            }
            i.prototype = Object.create(e.AbstractFilter.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            Object.defineProperties(i.prototype, {
                offset: {
                    get: function() {
                        return this.uniforms.offset.value
                    },
                    set: function(j) {
                        this.uniforms.offset.value = j
                    }
                },
                radius: {
                    get: function() {
                        return this.uniforms.radius.value
                    },
                    set: function(j) {
                        this.uniforms.radius.value = j
                    }
                },
                angle: {
                    get: function() {
                        return this.uniforms.angle.value
                    },
                    set: function(j) {
                        this.uniforms.angle.value = j
                    }
                }
            })
        }
        , {
            "../../core": 28
        }],
        113: [function(h, i, f) {
            var e = h("../core");
            function g() {
                this.global = new e.Point();
                this.target = null;
                this.originalEvent = null
            }
            g.prototype.constructor = g;
            i.exports = g;
            g.prototype.getLocalPosition = function(p, r, q) {
                var j = p.worldTransform;
                var l = q ? q : this.global;
                var o = j.a
                  , n = j.c
                  , m = j.tx
                  , u = j.b
                  , t = j.d
                  , s = j.ty
                  , k = 1 / (o * t + n * -u);
                r = r || new e.math.Point();
                r.x = t * k * l.x + -n * k * l.y + (s * n - m * t) * k;
                r.y = o * k * l.y + -u * k * l.x + (-s * o + m * u) * k;
                return r
            }
        }
        , {
            "../core": 28
        }],
        114: [function(h, i, f) {
            var e = h("../core")
              , g = h("./InteractionData");
            Object.assign(e.DisplayObject.prototype, h("./interactiveTarget"));
            function j(l, k) {
                k = k || {};
                this.renderer = l;
                this.autoPreventDefault = k.autoPreventDefault !== undefined ? k.autoPreventDefault : true;
                this.interactionFrequency = k.interactionFrequency || 10;
                this.mouse = new g();
                this.eventData = {
                    stopped: false,
                    target: null,
                    type: null,
                    data: this.mouse,
                    stopPropagation: function() {
                        this.stopped = true
                    }
                };
                this.interactiveDataPool = [];
                this.interactionDOMElement = null;
                this.eventsAdded = false;
                this.onMouseUp = this.onMouseUp.bind(this);
                this.processMouseUp = this.processMouseUp.bind(this);
                this.onMouseDown = this.onMouseDown.bind(this);
                this.processMouseDown = this.processMouseDown.bind(this);
                this.onMouseMove = this.onMouseMove.bind(this);
                this.processMouseMove = this.processMouseMove.bind(this);
                this.onMouseOut = this.onMouseOut.bind(this);
                this.processMouseOverOut = this.processMouseOverOut.bind(this);
                this.onTouchStart = this.onTouchStart.bind(this);
                this.processTouchStart = this.processTouchStart.bind(this);
                this.onTouchEnd = this.onTouchEnd.bind(this);
                this.processTouchEnd = this.processTouchEnd.bind(this);
                this.onTouchMove = this.onTouchMove.bind(this);
                this.processTouchMove = this.processTouchMove.bind(this);
                this.last = 0;
                this.currentCursorStyle = "inherit";
                this._tempPoint = new e.Point();
                this.resolution = 1;
                this.setTargetElement(this.renderer.view, this.renderer.resolution)
            }
            j.prototype.constructor = j;
            i.exports = j;
            j.prototype.setTargetElement = function(l, k) {
                this.removeEvents();
                this.interactionDOMElement = l;
                this.resolution = k || 1;
                this.addEvents()
            }
            ;
            j.prototype.addEvents = function() {
                if (!this.interactionDOMElement) {
                    return
                }
                e.ticker.shared.add(this.update, this);
                if (window.navigator.msPointerEnabled) {
                    this.interactionDOMElement.style["-ms-content-zooming"] = "none";
                    this.interactionDOMElement.style["-ms-touch-action"] = "none"
                }
                window.document.addEventListener("mousemove", this.onMouseMove, true);
                this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, true);
                this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, true);
                this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, true);
                this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, true);
                this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, true);
                window.addEventListener("mouseup", this.onMouseUp, true);
                this.eventsAdded = true
            }
            ;
            j.prototype.removeEvents = function() {
                if (!this.interactionDOMElement) {
                    return
                }
                e.ticker.shared.remove(this.update);
                if (window.navigator.msPointerEnabled) {
                    this.interactionDOMElement.style["-ms-content-zooming"] = "";
                    this.interactionDOMElement.style["-ms-touch-action"] = ""
                }
                window.document.removeEventListener("mousemove", this.onMouseMove, true);
                this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, true);
                this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, true);
                this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, true);
                this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, true);
                this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, true);
                this.interactionDOMElement = null;
                window.removeEventListener("mouseup", this.onMouseUp, true);
                this.eventsAdded = false
            }
            ;
            j.prototype.update = function(k) {
                this._deltaTime += k;
                if (this._deltaTime < this.interactionFrequency) {
                    return
                }
                this._deltaTime = 0;
                if (!this.interactionDOMElement) {
                    return
                }
                if (this.didMove) {
                    this.didMove = false;
                    return
                }
                this.cursor = "inherit";
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, true);
                if (this.currentCursorStyle !== this.cursor) {
                    this.currentCursorStyle = this.cursor;
                    this.interactionDOMElement.style.cursor = this.cursor
                }
            }
            ;
            j.prototype.dispatchEvent = function(m, k, l) {
                if (!l.stopped) {
                    l.target = m;
                    l.type = k;
                    m.emit(k, l);
                    if (m[k]) {
                        m[k](l)
                    }
                }
            }
            ;
            j.prototype.mapPositionToPoint = function(l, k, n) {
                var m = this.interactionDOMElement.getBoundingClientRect();
                l.x = ((k - m.left) * (this.interactionDOMElement.width / m.width)) / this.resolution;
                l.y = ((n - m.top) * (this.interactionDOMElement.height / m.height)) / this.resolution
            }
            ;
            j.prototype.processInteractive = function(k, r, p, m, l) {
                if (!r.visible) {
                    return false
                }
                var o = r.children;
                var q = false;
                l = l || r.interactive;
                if (r.interactiveChildren) {
                    for (var n = o.length - 1; n >= 0; n--) {
                        if (!q && m) {
                            q = this.processInteractive(k, o[n], p, true, l)
                        } else {
                            this.processInteractive(k, o[n], p, false, false)
                        }
                    }
                }
                if (l) {
                    if (m) {
                        if (r.hitArea) {
                            r.worldTransform.applyInverse(k, this._tempPoint);
                            q = r.hitArea.contains(this._tempPoint.x, this._tempPoint.y)
                        } else {
                            if (r.containsPoint) {
                                q = r.containsPoint(k)
                            }
                        }
                    }
                    if (r.interactive) {
                        p(r, q)
                    }
                }
                return q
            }
            ;
            j.prototype.onMouseDown = function(k) {
                this.mouse.originalEvent = k;
                this.eventData.data = this.mouse;
                this.eventData.stopped = false;
                this.mapPositionToPoint(this.mouse.global, k.clientX, k.clientY);
                if (this.autoPreventDefault) {
                    this.mouse.originalEvent.preventDefault()
                }
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, true)
            }
            ;
            j.prototype.processMouseDown = function(n, k) {
                var l = this.mouse.originalEvent;
                var m = l.button === 2 || l.which === 3;
                if (k) {
                    n[m ? "_isRightDown" : "_isLeftDown"] = true;
                    this.dispatchEvent(n, m ? "rightdown" : "mousedown", this.eventData)
                }
            }
            ;
            j.prototype.onMouseUp = function(k) {
                this.mouse.originalEvent = k;
                this.eventData.data = this.mouse;
                this.eventData.stopped = false;
                this.mapPositionToPoint(this.mouse.global, k.clientX, k.clientY);
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, true)
            }
            ;
            j.prototype.processMouseUp = function(o, l) {
                var m = this.mouse.originalEvent;
                var n = m.button === 2 || m.which === 3;
                var k = n ? "_isRightDown" : "_isLeftDown";
                if (l) {
                    this.dispatchEvent(o, n ? "rightup" : "mouseup", this.eventData);
                    if (o[k]) {
                        o[k] = false;
                        this.dispatchEvent(o, n ? "rightclick" : "click", this.eventData)
                    }
                } else {
                    if (o[k]) {
                        o[k] = false;
                        this.dispatchEvent(o, n ? "rightupoutside" : "mouseupoutside", this.eventData)
                    }
                }
            }
            ;
            j.prototype.onMouseMove = function(k) {
                this.mouse.originalEvent = k;
                this.eventData.data = this.mouse;
                this.eventData.stopped = false;
                this.mapPositionToPoint(this.mouse.global, k.clientX, k.clientY);
                this.didMove = true;
                this.cursor = "inherit";
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, true);
                if (this.currentCursorStyle !== this.cursor) {
                    this.currentCursorStyle = this.cursor;
                    this.interactionDOMElement.style.cursor = this.cursor
                }
            }
            ;
            j.prototype.processMouseMove = function(l, k) {
                this.dispatchEvent(l, "mousemove", this.eventData);
                this.processMouseOverOut(l, k)
            }
            ;
            j.prototype.onMouseOut = function(k) {
                this.mouse.originalEvent = k;
                this.eventData.stopped = false;
                this.mapPositionToPoint(this.mouse.global, k.clientX, k.clientY);
                this.interactionDOMElement.style.cursor = "inherit";
                this.mapPositionToPoint(this.mouse.global, k.clientX, k.clientY);
                this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, false)
            }
            ;
            j.prototype.processMouseOverOut = function(l, k) {
                if (k) {
                    if (!l._over) {
                        l._over = true;
                        this.dispatchEvent(l, "mouseover", this.eventData)
                    }
                    if (l.buttonMode) {
                        this.cursor = l.defaultCursor
                    }
                } else {
                    if (l._over) {
                        l._over = false;
                        this.dispatchEvent(l, "mouseout", this.eventData)
                    }
                }
            }
            ;
            j.prototype.onTouchStart = function(o) {
                if (this.autoPreventDefault) {
                    o.preventDefault()
                }
                var n = o.changedTouches;
                var p = n.length;
                for (var m = 0; m < p; m++) {
                    var k = n[m];
                    var l = this.getTouchData(k);
                    l.originalEvent = o;
                    this.eventData.data = l;
                    this.eventData.stopped = false;
                    this.processInteractive(l.global, this.renderer._lastObjectRendered, this.processTouchStart, true);
                    this.returnTouchData(l)
                }
            }
            ;
            j.prototype.processTouchStart = function(l, k) {
                if (k) {
                    l._touchDown = true;
                    this.dispatchEvent(l, "touchstart", this.eventData)
                }
            }
            ;
            j.prototype.onTouchEnd = function(o) {
                if (this.autoPreventDefault) {
                    o.preventDefault()
                }
                var n = o.changedTouches;
                var p = n.length;
                for (var m = 0; m < p; m++) {
                    var k = n[m];
                    var l = this.getTouchData(k);
                    l.originalEvent = o;
                    this.eventData.data = l;
                    this.eventData.stopped = false;
                    this.processInteractive(l.global, this.renderer._lastObjectRendered, this.processTouchEnd, true);
                    this.returnTouchData(l)
                }
            }
            ;
            j.prototype.processTouchEnd = function(l, k) {
                if (k) {
                    this.dispatchEvent(l, "touchend", this.eventData);
                    if (l._touchDown) {
                        l._touchDown = false;
                        this.dispatchEvent(l, "tap", this.eventData)
                    }
                } else {
                    if (l._touchDown) {
                        l._touchDown = false;
                        this.dispatchEvent(l, "touchendoutside", this.eventData)
                    }
                }
            }
            ;
            j.prototype.onTouchMove = function(o) {
                if (this.autoPreventDefault) {
                    o.preventDefault()
                }
                var n = o.changedTouches;
                var p = n.length;
                for (var m = 0; m < p; m++) {
                    var k = n[m];
                    var l = this.getTouchData(k);
                    l.originalEvent = o;
                    this.eventData.data = l;
                    this.eventData.stopped = false;
                    this.processInteractive(l.global, this.renderer._lastObjectRendered, this.processTouchMove, false);
                    this.returnTouchData(l)
                }
            }
            ;
            j.prototype.processTouchMove = function(l, k) {
                k = k;
                this.dispatchEvent(l, "touchmove", this.eventData)
            }
            ;
            j.prototype.getTouchData = function(k) {
                var l = this.interactiveDataPool.pop();
                if (!l) {
                    l = new g()
                }
                l.identifier = k.identifier;
                this.mapPositionToPoint(l.global, k.clientX, k.clientY);
                k.globalX = l.global.x;
                k.globalY = l.global.y;
                return l
            }
            ;
            j.prototype.returnTouchData = function(k) {
                this.interactiveDataPool.push(k)
            }
            ;
            j.prototype.destroy = function() {
                this.removeEvents();
                this.renderer = null;
                this.mouse = null;
                this.eventData = null;
                this.interactiveDataPool = null;
                this.interactionDOMElement = null;
                this.onMouseUp = null;
                this.processMouseUp = null;
                this.onMouseDown = null;
                this.processMouseDown = null;
                this.onMouseMove = null;
                this.processMouseMove = null;
                this.onMouseOut = null;
                this.processMouseOverOut = null;
                this.onTouchStart = null;
                this.processTouchStart = null;
                this.onTouchEnd = null;
                this.processTouchEnd = null;
                this.onTouchMove = null;
                this.processTouchMove = null;
                this._tempPoint = null
            }
            ;
            e.WebGLRenderer.registerPlugin("interaction", j);
            e.CanvasRenderer.registerPlugin("interaction", j)
        }
        , {
            "../core": 28,
            "./InteractionData": 113,
            "./interactiveTarget": 116
        }],
        115: [function(f, g, e) {
            g.exports = {
                InteractionData: f("./InteractionData"),
                InteractionManager: f("./InteractionManager"),
                interactiveTarget: f("./interactiveTarget")
            }
        }
        , {
            "./InteractionData": 113,
            "./InteractionManager": 114,
            "./interactiveTarget": 116
        }],
        116: [function(f, g, e) {
            g.exports = {
                interactive: false,
                buttonMode: false,
                interactiveChildren: true,
                defaultCursor: "pointer",
                _over: false,
                _touchDown: false
            }
        }
        , {}],
        117: [function(g, f, k) {
            var e = g("resource-loader").Resource
              , h = g("../core")
              , l = g("../core/utils")
              , j = g("../extras")
              , m = g("path");
            function i(p, w) {
                var q = {};
                var o = p.data.getElementsByTagName("info")[0];
                var u = p.data.getElementsByTagName("common")[0];
                q.font = o.getAttribute("face");
                q.size = parseInt(o.getAttribute("size"), 10);
                q.lineHeight = parseInt(u.getAttribute("lineHeight"), 10);
                q.chars = {};
                var v = p.data.getElementsByTagName("char");
                for (var r = 0; r < v.length; r++) {
                    var z = parseInt(v[r].getAttribute("id"), 10);
                    var y = new h.math.Rectangle(parseInt(v[r].getAttribute("x"), 10) + w.frame.x,parseInt(v[r].getAttribute("y"), 10) + w.frame.y,parseInt(v[r].getAttribute("width"), 10),parseInt(v[r].getAttribute("height"), 10));
                    q.chars[z] = {
                        xOffset: parseInt(v[r].getAttribute("xoffset"), 10),
                        yOffset: parseInt(v[r].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(v[r].getAttribute("xadvance"), 10),
                        kerning: {},
                        texture: new h.Texture(w.baseTexture,y)
                    }
                }
                var x = p.data.getElementsByTagName("kerning");
                for (r = 0; r < x.length; r++) {
                    var t = parseInt(x[r].getAttribute("first"), 10);
                    var n = parseInt(x[r].getAttribute("second"), 10);
                    var s = parseInt(x[r].getAttribute("amount"), 10);
                    q.chars[n].kerning[t] = s
                }
                p.bitmapFont = q;
                j.BitmapText.fonts[q.font] = q
            }
            f.exports = function() {
                return function(r, p) {
                    if (!r.data || !r.isXml) {
                        return p()
                    }
                    if (r.data.getElementsByTagName("page").length === 0 || r.data.getElementsByTagName("info").length === 0 || r.data.getElementsByTagName("info")[0].getAttribute("face") === null) {
                        return p()
                    }
                    var o = m.dirname(r.url);
                    if (o === ".") {
                        o = ""
                    }
                    if (this.baseUrl && o) {
                        if (this.baseUrl.charAt(this.baseUrl.length - 1) === "/") {
                            o += "/"
                        }
                        o = o.replace(this.baseUrl, "")
                    }
                    if (o && o.charAt(o.length - 1) !== "/") {
                        o += "/"
                    }
                    var n = o + r.data.getElementsByTagName("page")[0].getAttribute("file");
                    if (l.TextureCache[n]) {
                        i(r, l.TextureCache[n]);
                        p()
                    } else {
                        var q = {
                            crossOrigin: r.crossOrigin,
                            loadType: e.LOAD_TYPE.IMAGE
                        };
                        this.add(r.name + "_image", n, q, function(s) {
                            i(r, s.texture);
                            p()
                        })
                    }
                }
            }
        }
        , {
            "../core": 28,
            "../core/utils": 74,
            "../extras": 83,
            path: 3,
            "resource-loader": 17
        }],
        118: [function(f, g, e) {
            g.exports = {
                Loader: f("./loader"),
                bitmapFontParser: f("./bitmapFontParser"),
                spritesheetParser: f("./spritesheetParser"),
                textureParser: f("./textureParser"),
                Resource: f("resource-loader").Resource
            }
        }
        , {
            "./bitmapFontParser": 117,
            "./loader": 119,
            "./spritesheetParser": 120,
            "./textureParser": 121,
            "resource-loader": 17
        }],
        119: [function(i, h, k) {
            var m = i("resource-loader")
              , j = i("./textureParser")
              , g = i("./spritesheetParser")
              , l = i("./bitmapFontParser");
            function f(p, o) {
                m.call(this, p, o);
                for (var n = 0; n < f._pixiMiddleware.length; ++n) {
                    this.use(f._pixiMiddleware[n]())
                }
            }
            f.prototype = Object.create(m.prototype);
            f.prototype.constructor = f;
            h.exports = f;
            f._pixiMiddleware = [m.middleware.parsing.blob, j, g, l];
            f.addPixiMiddleware = function(n) {
                f._pixiMiddleware.push(n)
            }
            ;
            var e = m.Resource;
            e.setExtensionXhrType("fnt", e.XHR_RESPONSE_TYPE.DOCUMENT)
        }
        , {
            "./bitmapFontParser": 117,
            "./spritesheetParser": 120,
            "./textureParser": 121,
            "resource-loader": 17
        }],
        120: [function(g, h, f) {
            var j = g("resource-loader").Resource
              , i = g("path")
              , e = g("../core");
            h.exports = function() {
                return function(o, m) {
                    if (!o.data || !o.isJson || !o.data.frames) {
                        return m()
                    }
                    var n = {
                        crossOrigin: o.crossOrigin,
                        loadType: j.LOAD_TYPE.IMAGE
                    };
                    var k = i.dirname(o.url.replace(this.baseUrl, ""));
                    var l = e.utils.getResolutionOfUrl(o.url);
                    this.add(o.name + "_image", k + "/" + o.data.meta.image, n, function(t) {
                        o.textures = {};
                        var v = o.data.frames;
                        for (var s in v) {
                            var u = v[s].frame;
                            if (u) {
                                var r = null;
                                var p = null;
                                if (v[s].rotated) {
                                    r = new e.math.Rectangle(u.x,u.y,u.h,u.w)
                                } else {
                                    r = new e.math.Rectangle(u.x,u.y,u.w,u.h)
                                }
                                if (v[s].trimmed) {
                                    p = new e.math.Rectangle(v[s].spriteSourceSize.x / l,v[s].spriteSourceSize.y / l,v[s].sourceSize.w / l,v[s].sourceSize.h / l)
                                }
                                if (v[s].rotated) {
                                    var q = r.width;
                                    r.width = r.height;
                                    r.height = q
                                }
                                r.x /= l;
                                r.y /= l;
                                r.width /= l;
                                r.height /= l;
                                o.textures[s] = new e.Texture(t.texture.baseTexture,r,r.clone(),p,v[s].rotated);
                                e.utils.TextureCache[s] = o.textures[s]
                            }
                        }
                        m()
                    })
                }
            }
        }
        , {
            "../core": 28,
            path: 3,
            "resource-loader": 17
        }],
        121: [function(g, h, f) {
            var e = g("../core");
            h.exports = function() {
                return function(j, i) {
                    if (j.data && j.isImage) {
                        j.texture = new e.Texture(new e.BaseTexture(j.data,null,e.utils.getResolutionOfUrl(j.url)));
                        e.utils.TextureCache[j.url] = j.texture
                    }
                    i()
                }
            }
        }
        , {
            "../core": 28
        }],
        122: [function(g, h, f) {
            var e = g("../core");
            function i(l, j, k, n, m) {
                e.Container.call(this);
                this.texture = l;
                this.uvs = k || new Float32Array([0, 1, 1, 1, 1, 0, 0, 1]);
                this.vertices = j || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]);
                this.indices = n || new Uint16Array([0, 1, 2, 3]);
                this.dirty = true;
                this.blendMode = e.BLEND_MODES.NORMAL;
                this.canvasPadding = 0;
                this.drawMode = m || i.DRAW_MODES.TRIANGLE_MESH
            }
            i.prototype = Object.create(e.Container.prototype);
            i.prototype.constructor = i;
            h.exports = i;
            i.prototype._renderWebGL = function(j) {
                j.setObjectRenderer(j.plugins.mesh);
                j.plugins.mesh.render(this)
            }
            ;
            i.prototype._renderCanvas = function(l) {
                var k = l.context;
                var j = this.worldTransform;
                if (l.roundPixels) {
                    k.setTransform(j.a, j.b, j.c, j.d, j.tx | 0, j.ty | 0)
                } else {
                    k.setTransform(j.a, j.b, j.c, j.d, j.tx, j.ty)
                }
                if (this.drawMode === i.DRAW_MODES.TRIANGLE_MESH) {
                    this._renderCanvasTriangleMesh(k)
                } else {
                    this._renderCanvasTriangles(k)
                }
            }
            ;
            i.prototype._renderCanvasTriangleMesh = function(n) {
                var k = this.vertices;
                var m = this.uvs;
                var o = k.length / 2;
                for (var l = 0; l < o - 2; l++) {
                    var j = l * 2;
                    this._renderCanvasDrawTriangle(n, k, m, j, (j + 2), (j + 4))
                }
            }
            ;
            i.prototype._renderCanvasTriangles = function(j) {
                var o = this.vertices;
                var l = this.uvs;
                var r = this.indices;
                var k = r.length;
                for (var m = 0; m < k; m += 3) {
                    var q = r[m] * 2
                      , p = r[m + 1] * 2
                      , n = r[m + 2] * 2;
                    this._renderCanvasDrawTriangle(j, o, l, q, p, n)
                }
            }
            ;
            i.prototype._renderCanvasDrawTriangle = function(o, u, E, w, t, s) {
                var l = this.texture.baseTexture.source;
                var j = this.texture.width;
                var F = this.texture.height;
                var Q = u[w]
                  , P = u[t]
                  , N = u[s];
                var r = u[w + 1]
                  , q = u[t + 1]
                  , n = u[s + 1];
                var O = E[w] * j
                  , M = E[t] * j
                  , L = E[s] * j;
                var p = E[w + 1] * F
                  , m = E[t + 1] * F
                  , k = E[s + 1] * F;
                if (this.canvasPadding > 0) {
                    var K = this.canvasPadding / this.worldTransform.a;
                    var J = this.canvasPadding / this.worldTransform.d;
                    var C = (Q + P + N) / 3;
                    var A = (r + q + n) / 3;
                    var I = Q - C;
                    var H = r - A;
                    var G = Math.sqrt(I * I + H * H);
                    Q = C + (I / G) * (G + K);
                    r = A + (H / G) * (G + J);
                    I = P - C;
                    H = q - A;
                    G = Math.sqrt(I * I + H * H);
                    P = C + (I / G) * (G + K);
                    q = A + (H / G) * (G + J);
                    I = N - C;
                    H = n - A;
                    G = Math.sqrt(I * I + H * H);
                    N = C + (I / G) * (G + K);
                    n = A + (H / G) * (G + J)
                }
                o.save();
                o.beginPath();
                o.moveTo(Q, r);
                o.lineTo(P, q);
                o.lineTo(N, n);
                o.closePath();
                o.clip();
                var R = (O * m) + (p * L) + (M * k) - (m * L) - (p * M) - (O * k);
                var D = (Q * m) + (p * N) + (P * k) - (m * N) - (p * P) - (Q * k);
                var B = (O * P) + (Q * L) + (M * N) - (P * L) - (Q * M) - (O * N);
                var z = (O * m * N) + (p * P * L) + (Q * M * k) - (Q * m * L) - (p * M * N) - (O * P * k);
                var y = (r * m) + (p * n) + (q * k) - (m * n) - (p * q) - (r * k);
                var x = (O * q) + (r * L) + (M * n) - (q * L) - (r * M) - (O * n);
                var v = (O * m * n) + (p * q * L) + (r * M * k) - (r * m * L) - (p * M * n) - (O * q * k);
                o.transform(D / R, y / R, B / R, x / R, z / R, v / R);
                o.drawImage(l, 0, 0);
                o.restore()
            }
            ;
            i.prototype.renderMeshFlat = function(o) {
                var k = this.context;
                var r = o.vertices;
                var m = r.length / 2;
                k.beginPath();
                for (var p = 1; p < m - 2; p++) {
                    var q = p * 2;
                    var n = r[q]
                      , l = r[q + 2]
                      , j = r[q + 4];
                    var u = r[q + 1]
                      , t = r[q + 3]
                      , s = r[q + 5];
                    k.moveTo(n, u);
                    k.lineTo(l, t);
                    k.lineTo(j, s)
                }
                k.fillStyle = "#FF0000";
                k.fill();
                k.closePath()
            }
            ;
            i.prototype.onTextureUpdate = function() {
                this.updateFrame = true
            }
            ;
            i.prototype.getBounds = function(s) {
                var r = s || this.worldTransform;
                var E = r.a;
                var C = r.b;
                var A = r.c;
                var v = r.d;
                var F = r.tx;
                var D = r.ty;
                var z = -Infinity;
                var u = -Infinity;
                var B = Infinity;
                var w = Infinity;
                var l = this.vertices;
                for (var t = 0, q = l.length; t < q; t += 2) {
                    var k = l[t]
                      , j = l[t + 1];
                    var p = (E * k) + (A * j) + F;
                    var o = (v * j) + (C * k) + D;
                    B = p < B ? p : B;
                    w = o < w ? o : w;
                    z = p > z ? p : z;
                    u = o > u ? o : u
                }
                if (B === -Infinity || u === Infinity) {
                    return e.math.Rectangle.EMPTY
                }
                var m = this._bounds;
                m.x = B;
                m.width = z - B;
                m.y = w;
                m.height = u - w;
                this._currentBounds = m;
                return m
            }
            ;
            i.DRAW_MODES = {
                TRIANGLE_MESH: 0,
                TRIANGLES: 1
            }
        }
        , {
            "../core": 28
        }],
        123: [function(f, h, e) {
            var i = f("./Mesh");
            function g(k, j) {
                i.call(this, k);
                this.points = j;
                this.vertices = new Float32Array(j.length * 4);
                this.uvs = new Float32Array(j.length * 4);
                this.colors = new Float32Array(j.length * 2);
                this.indices = new Uint16Array(j.length * 2);
                this.refresh()
            }
            g.prototype = Object.create(i.prototype);
            g.prototype.constructor = g;
            h.exports = g;
            g.prototype.refresh = function() {
                var q = this.points;
                if (q.length < 1) {
                    return
                }
                var k = this.uvs;
                var r = this.indices;
                var j = this.colors;
                k[0] = 0;
                k[1] = 0;
                k[2] = 0;
                k[3] = 1;
                j[0] = 1;
                j[1] = 1;
                r[0] = 0;
                r[1] = 1;
                var o = q.length, p, n, m;
                for (var l = 1; l < o; l++) {
                    p = q[l];
                    n = l * 4;
                    m = l / (o - 1);
                    if (l % 2) {
                        k[n] = m;
                        k[n + 1] = 0;
                        k[n + 2] = m;
                        k[n + 3] = 1
                    } else {
                        k[n] = m;
                        k[n + 1] = 0;
                        k[n + 2] = m;
                        k[n + 3] = 1
                    }
                    n = l * 2;
                    j[n] = 1;
                    j[n + 1] = 1;
                    n = l * 2;
                    r[n] = n;
                    r[n + 1] = n + 1
                }
            }
            ;
            g.prototype.updateTransform = function() {
                var t = this.points;
                if (t.length < 1) {
                    return
                }
                var r = t[0];
                var p;
                var v = 0;
                var u = 0;
                var n = this.vertices;
                var q = t.length, s, m, o, j, l;
                for (var k = 0; k < q; k++) {
                    s = t[k];
                    m = k * 4;
                    if (k < t.length - 1) {
                        p = t[k + 1]
                    } else {
                        p = s
                    }
                    u = -(p.x - r.x);
                    v = p.y - r.y;
                    o = (1 - (k / (q - 1))) * 10;
                    if (o > 1) {
                        o = 1
                    }
                    j = Math.sqrt(v * v + u * u);
                    l = this.texture.height / 2;
                    v /= j;
                    u /= j;
                    v *= l;
                    u *= l;
                    n[m] = s.x + v;
                    n[m + 1] = s.y + u;
                    n[m + 2] = s.x - v;
                    n[m + 3] = s.y - u;
                    r = s
                }
                this.containerUpdateTransform()
            }
        }
        , {
            "./Mesh": 122
        }],
        124: [function(f, g, e) {
            g.exports = {
                Mesh: f("./Mesh"),
                Rope: f("./Rope"),
                MeshRenderer: f("./webgl/MeshRenderer"),
                MeshShader: f("./webgl/MeshShader")
            }
        }
        , {
            "./Mesh": 122,
            "./Rope": 123,
            "./webgl/MeshRenderer": 125,
            "./webgl/MeshShader": 126
        }],
        125: [function(h, i, g) {
            var j = h("../../core/renderers/webgl/utils/ObjectRenderer")
              , e = h("../../core/renderers/webgl/WebGLRenderer");
            function f(m) {
                j.call(this, m);
                this.indices = new Uint16Array(15000);
                for (var l = 0, k = 0; l < 15000; l += 6,
                k += 4) {
                    this.indices[l + 0] = k + 0;
                    this.indices[l + 1] = k + 1;
                    this.indices[l + 2] = k + 2;
                    this.indices[l + 3] = k + 0;
                    this.indices[l + 4] = k + 2;
                    this.indices[l + 5] = k + 3
                }
            }
            f.prototype = Object.create(j.prototype);
            f.prototype.constructor = f;
            i.exports = f;
            e.registerPlugin("mesh", f);
            f.prototype.onContextChange = function() {}
            ;
            f.prototype.render = function(p) {
                if (!p._vertexBuffer) {
                    this._initWebGL(p)
                }
                var n = this.renderer
                  , o = n.gl
                  , l = p.texture.baseTexture
                  , k = n.shaderManager.plugins.meshShader;
                var m = o.TRIANGLE_STRIP;
                n.blendModeManager.setBlendMode(p.blendMode);
                o.uniformMatrix3fv(k.uniforms.translationMatrix._location, false, p.worldTransform.toArray(true));
                o.uniformMatrix3fv(k.uniforms.projectionMatrix._location, false, n.currentRenderTarget.projectionMatrix.toArray(true));
                o.uniform1f(k.uniforms.alpha._location, p.worldAlpha);
                if (!p.dirty) {
                    o.bindBuffer(o.ARRAY_BUFFER, p._vertexBuffer);
                    o.bufferSubData(o.ARRAY_BUFFER, 0, p.vertices);
                    o.vertexAttribPointer(k.attributes.aVertexPosition, 2, o.FLOAT, false, 0, 0);
                    o.bindBuffer(o.ARRAY_BUFFER, p._uvBuffer);
                    o.vertexAttribPointer(k.attributes.aTextureCoord, 2, o.FLOAT, false, 0, 0);
                    o.activeTexture(o.TEXTURE0);
                    if (!l._glTextures[o.id]) {
                        this.renderer.updateTexture(l)
                    } else {
                        o.bindTexture(o.TEXTURE_2D, l._glTextures[o.id])
                    }
                } else {
                    p.dirty = false;
                    o.bindBuffer(o.ARRAY_BUFFER, p._vertexBuffer);
                    o.bufferData(o.ARRAY_BUFFER, p.vertices, o.STATIC_DRAW);
                    o.vertexAttribPointer(k.attributes.aVertexPosition, 2, o.FLOAT, false, 0, 0);
                    o.bindBuffer(o.ARRAY_BUFFER, p._uvBuffer);
                    o.bufferData(o.ARRAY_BUFFER, p.uvs, o.STATIC_DRAW);
                    o.vertexAttribPointer(k.attributes.aTextureCoord, 2, o.FLOAT, false, 0, 0);
                    o.activeTexture(o.TEXTURE0);
                    if (!l._glTextures[o.id]) {
                        this.renderer.updateTexture(l)
                    } else {
                        o.bindTexture(o.TEXTURE_2D, l._glTextures[o.id])
                    }
                    o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, p._indexBuffer);
                    o.bufferData(o.ELEMENT_ARRAY_BUFFER, p.indices, o.STATIC_DRAW)
                }
                o.drawElements(m, p.indices.length, o.UNSIGNED_SHORT, 0)
            }
            ;
            f.prototype._initWebGL = function(l) {
                var k = this.renderer.gl;
                l._vertexBuffer = k.createBuffer();
                l._indexBuffer = k.createBuffer();
                l._uvBuffer = k.createBuffer();
                l._colorBuffer = k.createBuffer();
                k.bindBuffer(k.ARRAY_BUFFER, l._vertexBuffer);
                k.bufferData(k.ARRAY_BUFFER, l.vertices, k.DYNAMIC_DRAW);
                k.bindBuffer(k.ARRAY_BUFFER, l._uvBuffer);
                k.bufferData(k.ARRAY_BUFFER, l.uvs, k.STATIC_DRAW);
                k.bindBuffer(k.ARRAY_BUFFER, l._colorBuffer);
                k.bufferData(k.ARRAY_BUFFER, l.colors, k.STATIC_DRAW);
                k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, l._indexBuffer);
                k.bufferData(k.ELEMENT_ARRAY_BUFFER, l.indices, k.STATIC_DRAW)
            }
            ;
            f.prototype.flush = function() {}
            ;
            f.prototype.start = function() {
                var k = this.renderer.shaderManager.plugins.meshShader;
                this.renderer.shaderManager.setShader(k)
            }
            ;
            f.prototype.destroy = function() {}
        }
        , {
            "../../core/renderers/webgl/WebGLRenderer": 47,
            "../../core/renderers/webgl/utils/ObjectRenderer": 61
        }],
        126: [function(h, i, g) {
            var e = h("../../core");
            function f(j) {
                e.Shader.call(this, j, ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;", "}"].join("\n"), {
                    alpha: {
                        type: "1f",
                        value: 0
                    },
                    translationMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    },
                    projectionMatrix: {
                        type: "mat3",
                        value: new Float32Array(9)
                    }
                }, {
                    aVertexPosition: 0,
                    aTextureCoord: 0
                })
            }
            f.prototype = Object.create(e.Shader.prototype);
            f.prototype.constructor = f;
            i.exports = f;
            e.ShaderManager.registerPlugin("meshShader", f)
        }
        , {
            "../../core": 28
        }],
        127: [function(f, g, e) {
            if (!Object.assign) {
                Object.assign = f("object-assign")
            }
        }
        , {
            "object-assign": 11
        }],
        128: [function(f, g, e) {
            f("./Object.assign");
            f("./requestAnimationFrame")
        }
        , {
            "./Object.assign": 127,
            "./requestAnimationFrame": 129
        }],
        129: [function(f, g, e) {
            (function(k) {
                if (!(Date.now && Date.prototype.getTime)) {
                    Date.now = function i() {
                        return new Date().getTime()
                    }
                }
                if (!(k.performance && k.performance.now)) {
                    var j = Date.now();
                    if (!k.performance) {
                        k.performance = {}
                    }
                    k.performance.now = function() {
                        return Date.now() - j
                    }
                }
                var l = Date.now();
                var m = ["ms", "moz", "webkit", "o"];
                for (var h = 0; h < m.length && !k.requestAnimationFrame; ++h) {
                    k.requestAnimationFrame = k[m[h] + "RequestAnimationFrame"];
                    k.cancelAnimationFrame = k[m[h] + "CancelAnimationFrame"] || k[m[h] + "CancelRequestAnimationFrame"]
                }
                if (!k.requestAnimationFrame) {
                    k.requestAnimationFrame = function(p) {
                        if (typeof p !== "function") {
                            throw new TypeError(p + "is not a function")
                        }
                        var o = Date.now()
                          , n = 16 + l - o;
                        if (n < 0) {
                            n = 0
                        }
                        l = o;
                        return setTimeout(function() {
                            l = Date.now();
                            p(performance.now())
                        }, n)
                    }
                }
                if (!k.cancelAnimationFrame) {
                    k.cancelAnimationFrame = function(n) {
                        clearTimeout(n)
                    }
                }
            }
            ).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }
        , {}],
        130: [function(j, h, n) {
            var k = j("../core")
              , t = j("eventemitter3")
              , m = "tick";
            function e() {
                var v = this;
                this._tick = function u(w) {
                    v._requestId = null;
                    if (v.started) {
                        v.update(w);
                        if (v.started && v._requestId === null && v._emitter.listeners(m, true)) {
                            v._requestId = requestAnimationFrame(v._tick)
                        }
                    }
                }
                ;
                this._emitter = new t();
                this._requestId = null;
                this._maxElapsedMS = 100;
                this.autoStart = false;
                this.deltaTime = 1;
                this.elapsedMS = 1 / k.TARGET_FPMS;
                this.lastTime = 0;
                this.speed = 1;
                this.started = false
            }
            Object.defineProperties(e.prototype, {
                FPS: {
                    get: function() {
                        return 1000 / this.elapsedMS
                    }
                },
                minFPS: {
                    get: function() {
                        return 1000 / this._maxElapsedMS
                    },
                    set: function(u) {
                        var v = Math.min(Math.max(0, u) / 1000, k.TARGET_FPMS);
                        this._maxElapsedMS = 1 / v
                    }
                }
            });
            e.prototype._requestIfNeeded = function s() {
                if (this._requestId === null && this._emitter.listeners(m, true)) {
                    this.lastTime = performance.now();
                    this._requestId = requestAnimationFrame(this._tick)
                }
            }
            ;
            e.prototype._cancelIfNeeded = function i() {
                if (this._requestId !== null) {
                    cancelAnimationFrame(this._requestId);
                    this._requestId = null
                }
            }
            ;
            e.prototype._startIfPossible = function r() {
                if (this.started) {
                    this._requestIfNeeded()
                } else {
                    if (this.autoStart) {
                        this.start()
                    }
                }
            }
            ;
            e.prototype.add = function q(v, u) {
                this._emitter.on(m, v, u);
                this._startIfPossible();
                return this
            }
            ;
            e.prototype.addOnce = function f(v, u) {
                this._emitter.once(m, v, u);
                this._startIfPossible();
                return this
            }
            ;
            e.prototype.remove = function o(v, u) {
                this._emitter.off(m, v, u);
                if (!this._emitter.listeners(m, true)) {
                    this._cancelIfNeeded()
                }
                return this
            }
            ;
            e.prototype.start = function g() {
                if (!this.started) {
                    this.started = true;
                    this._requestIfNeeded()
                }
            }
            ;
            e.prototype.stop = function p() {
                if (this.started) {
                    this.started = false;
                    this._cancelIfNeeded()
                }
            }
            ;
            e.prototype.update = function l(v) {
                var u;
                v = v || performance.now();
                u = this.elapsedMS = v - this.lastTime;
                if (u > this._maxElapsedMS) {
                    u = this._maxElapsedMS
                }
                this.deltaTime = u * k.TARGET_FPMS * this.speed;
                this._emitter.emit(m, this.deltaTime);
                this.lastTime = v
            }
            ;
            h.exports = e
        }
        , {
            "../core": 28,
            eventemitter3: 10
        }],
        131: [function(f, g, e) {
            var i = f("./Ticker");
            var h = new i();
            h.autoStart = true;
            g.exports = {
                shared: h,
                Ticker: i
            }
        }
        , {
            "./Ticker": 130
        }]
    }, {}, [1])(1)
});
