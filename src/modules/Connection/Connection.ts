import { DataSource, DataSourceOptions } from "typeorm";
import { ormconfig } from "../../../ormconfig";

/**
 * The Connection interface. This inteface use type orm to connect DB(Mysql).
 */
export interface ConnectionInterface {
  /**
   * Create a connection to mysql.
   */
  getConnection(): DataSource;

  /**
   * Check the connect to mysql.
   */
  isInitialized(): Boolean;
}

export default new (class Connection implements ConnectionInterface {
  private ormconfig: DataSourceOptions;
  protected dataSource: DataSource;

  /**
   * Create a constructor to create a datasource from typeorm.
   * And the ormconfig in root directory(ormconfig.ts).
   */
  constructor() {
    this.ormconfig = ormconfig;
    this.dataSource = new DataSource(this.ormconfig);
  }

  public getConnection(): DataSource {
    if (!this.isInitialized()) {
      this.doInitialize();
    }
    return this.dataSource;
  }

  public isInitialized(): Boolean {
    return this.dataSource?.isInitialized ?? false;
  }

  protected doInitialize(): void {
    this.dataSource
      .initialize()
      .then(() => console.log("Connected"))
      .catch((error) => console.log(error));
  }
})();
