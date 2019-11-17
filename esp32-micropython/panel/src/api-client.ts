export interface ApiClient {
  getStatus(): Promise<DeviceStatus>;
  getNetworks(): Promise<WifiNetwork[]>;
  getSavedNetworks(): Promise<WifiNetwork[]>;

  connect(ssid: string, pass: string): Promise<ConnectResult>;
  connectSaved(ssid: string): Promise<ConnectResult>;
}

export interface DeviceStatus {
  ap?: [string, string, string, string];
  sta?: [string, string, string, string];
}

export interface WifiNetwork {
  ssid: string;
  channel: number;
  rssi?: number;
  saved?: true;
}

export interface SavedNetwork {
  ssid: string;
  rssi: number;
}

export interface ConnectResult {
  status: 'connected' | 'failed';
  ip_address: string;
}

const sleep = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const newDummyApiClient = (): ApiClient => {
  return {
    async getStatus() {
      await sleep(1000);

      return {
        ap: ['0.0.0.0', '0.0.0.0', '0.0.0.0', '0.0.0.0'],
        sta: ['0.0.0.0', '0.0.0.0', '0.0.0.0', '0.0.0.0'],
      };
    },

    async getNetworks() {
      await sleep(1000);

      return [
        { ssid: 'Test 1', channel: 1, rssi: -10 },
        { ssid: 'Test 2', channel: 2, rssi: -10 },
        { ssid: 'Test 3', channel: 3, rssi: -10 },
      ];
    },

    async getSavedNetworks() {
      await sleep(1000);

      return [
        { ssid: 'Test 1', channel: 1, rssi: -10, saved: true },
        { ssid: 'Saved A', channel: 2, saved: true },
        { ssid: 'Saved B', channel: 3, saved: true },
      ];
    },

    async connect(ssid: string, password: string) {
      throw new Error();
    },

    async connectSaved(ssid: string) {
      throw new Error();
    },
  };
};

export const newApiClient = (): ApiClient => {
  // This is a slight hack to test the panel running locally...
  const baseUrl = window.location.hostname === 'localhost' ? 'http://192.168.0.127' : '';

  const doRequest = async <TData extends object>(path: string, postData: any = {}) => {
    try {
      const postJson = JSON.stringify(postData);

      // This is weird, but had issues parsing the POST body in MicroPython.
      // So sending JSON as a header value instead...
      const headers = new Headers({
        'x-json': postJson,
      });

      const res = await window.fetch(`${baseUrl}/${path}`, { method: 'POST', headers });

      const data: TData = await res.json();

      return data;
    } catch (err) {
      console.error('doRequest', err);

      throw new Error('Failed to make API request');
    }
  };

  return {
    async getStatus() {
      return doRequest<DeviceStatus>('status.json');
    },

    async getNetworks() {
      const data = await doRequest<WifiNetwork[]>('network_list.json');

      if (!Array.isArray(data)) throw new Error('Invalid response data');

      return data;
    },

    async getSavedNetworks() {
      const data = await doRequest<WifiNetwork[]>('network_saved_list.json');

      if (!Array.isArray(data)) throw new Error('Invalid response data');

      return data;
    },

    async connect(ssid: string, pass: string) {
      const data = await doRequest<ConnectResult>('api', { method: 'connect', ssid, pass });

      return data;
    },

    async connectSaved(ssid: string) {
      const data = await doRequest<ConnectResult>('api', { method: 'connect_saved', ssid });

      return data;
    },
  };
};
