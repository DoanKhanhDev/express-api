import { ObjectLiteral, Repository } from "typeorm";
import EntityTypeManager from "../Entity/EntityTypeManager";

/**
 * The Connection interface. This inteface use type orm to connect DB(Mysql).
 */
export interface ConfigFactoryInteface {
  readonly entityType: string;

  /**
   * Get a config by key.
   * @param {string} key
   */
  get(key: string): any;
}

export default new (class ConfigFactory implements ConfigFactoryInteface {
  entityType: string = "config";
  protected configFactory: Repository<ObjectLiteral> | null;

  /**
   * Create a constructor to the configs and handle it.
   */
  constructor() {
    this.configFactory = EntityTypeManager.getStorage(this.entityType);
  }

  async get(key: string): Promise<any> {
    let config =
      (await this.configFactory?.findOneBy({
        key: key,
      })) ?? undefined;
    if (typeof config === undefined) {
      return config;
    }
    return config?.value;
  }

  async set(key: string, value: Array<any>): Promise<void> {
    const config: any = this.get(key);
    const record = {
      key: key,
      value: this.convertToString(value),
    };
    if (config !== undefined) {
      this.configFactory?.update({ id: config.id }, record);
    }
    this.configFactory?.save(record);
  }

  protected convertToString(value: Array<any>): Array<string> {
    return value.toString().split(",");
  }
})();
