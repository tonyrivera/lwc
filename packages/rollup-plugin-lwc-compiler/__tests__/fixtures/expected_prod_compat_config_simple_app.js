(function(a) {
    "use strict";
    function b(a, b) {
      if (!(a instanceof b))
        throw new TypeError("Cannot call a class as a function");
    }
    function c(a, b) {
      for (var c, d = 0; d < j(b, "length"); d++)
        (c = j(b, d)),
          k(c, "enumerable", j(c, "enumerable") || !1),
          k(c, "configurable", !0),
          l(c, "value") && k(c, "writable", !0),
          Object.defineProperty(a, j(c, "key"), c);
    }
    function d(a, b, d) {
      return b && c(j(a, "prototype"), b), d && c(a, d), a;
    }
    function e(a, b) {
      if (b && ("object" == typeof b || "function" == typeof b)) return b;
      if (void 0 === a)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return a;
    }
    function f(a, b) {
      if ("function" != typeof b && null !== b)
        throw new TypeError("Super expression must either be null or a function");
      i(
        a,
        "prototype",
        Object.create(b && m(b, "prototype"), {
          constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
      ),
        b &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(a, b)
            : i(a, "__proto__", b));
    }
    function g(a, b) {
      var c = p(a, "d"),
        d = p(a, "h");
      return [d("div", { key: 1 }, [c(p(b, "x"))])];
    }
    function h(a) {
      var b = w(a, "c"),
        c = w(a, "h");
      return [
        c("div", { classMap: { container: !0 }, key: 2 }, [
          b("x-foo", v, { props: { x: "1" }, key: 1 })
        ])
      ];
    }
    var j = Proxy.getKey,
      k = Proxy.setKey,
      l = Proxy.inKey,
      i = Proxy.setKey,
      m = Proxy.getKey,
      n = void 0,
      o = void 0,
      p = Proxy.getKey,
      q = Proxy.setKey;
    if (o) {
      var r = "x-foo_foo";
      q(g, "token", r), q(g, "style", o("x-foo", r));
    }
    var s = Proxy.setKey,
      t = Proxy.callKey,
      u = Proxy.getKey,
      v = (function(a) {
        function c() {
          var a, d;
          b(this, c);
          for (var f, g = arguments.length, h = Array(g), i = 0; i < g; i++)
            s(h, i, arguments[i]);
          return e(
            d,
            ((f = d = e(
              this,
              t(
                u((a = u(c, "__proto__") || Object.getPrototypeOf(c)), "call"),
                "apply",
                a,
                [this].concat(h)
              )
            )),
            s(d, "x", void 0),
            f)
          );
        }
        return (
          f(c, a),
          d(c, [
            {
              key: "render",
              value: function() {
                return g;
              }
            }
          ]),
          c
        );
      })(a.Element);
    s(v, "publicProps", { x: { config: 0 } });
    var w = Proxy.getKey,
      x = Proxy.setKey;
    if (n) {
      var y = "x-app_app";
      x(h, "token", y), x(h, "style", n("x-app", y));
    }
    var z = Proxy.callKey,
      A = Proxy.getKey,
      B = Proxy.setKey,
      C = (function(a) {
        function c() {
          var a;
          return (
            b(this, c),
            (a = e(
              this,
              z(A(c, "__proto__") || Object.getPrototypeOf(c), "call", this)
            )),
            B(a, "list", []),
            a
          );
        }
        return (
          f(c, a),
          d(c, [
            {
              key: "render",
              value: function() {
                return h;
              }
            }
          ]),
          c
        );
      })(a.Element),
      D = Proxy.callKey,
      E = D(document, "getElementById", "main"),
      F = a.createElement("x-app", { is: C });
    D(E, "appendChild", F);
  })(engine);