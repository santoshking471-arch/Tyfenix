var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { m as Subscribable, s as shallowEqualObjects, n as hashKey, o as getDefaultState, p as notifyManager, q as useQueryClient, r as reactExports, t as noop, v as shouldThrowError, w as useActor, x as useQuery } from "./index-C-xUBXvy.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useProducts(category) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(category ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useProduct(id) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id == null) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id != null,
    staleTime: 3e4
  });
}
function useSearchProducts(term) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["search", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchProducts(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
    staleTime: 1e4
  });
}
function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.createProduct(
        data.name,
        data.description,
        data.price,
        data.imageUrl,
        data.category,
        data.stock
      );
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] })
  });
}
function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateProduct(
        data.id,
        data.name ?? null,
        data.description ?? null,
        data.price ?? null,
        data.imageUrl ?? null,
        data.category ?? null,
        data.stock ?? null,
        data.isActive ?? null
      );
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", vars.id.toString()]
      });
    }
  });
}
function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.deleteProduct(id);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] })
  });
}
function useMyOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (shippingAddress) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.placeOrder(shippingAddress);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateOrderStatus(id, status);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.updateProfile(name ?? null, email ?? null);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myProfile"] })
  });
}
function useCustomers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCustomers();
    },
    enabled: !!actor && !isFetching
  });
}
function useSetCustomerRole() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerId,
      role
    }) => {
      if (!actor) throw new Error("Not connected");
      const res = await actor.setCustomerRole(customerId, role);
      if (res.__kind__ === "err")
        throw new Error(Object.values(res.err)[0]);
      return res.ok;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] })
  });
}
function useAnalytics() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAnalytics();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4
  });
}
export {
  useSearchProducts as a,
  useProduct as b,
  usePlaceOrder as c,
  useMyOrders as d,
  useUpdateProfile as e,
  useAnalytics as f,
  useAllOrders as g,
  useCustomers as h,
  useCreateProduct as i,
  useUpdateProduct as j,
  useDeleteProduct as k,
  useUpdateOrderStatus as l,
  useSetCustomerRole as m,
  useProducts as u
};
