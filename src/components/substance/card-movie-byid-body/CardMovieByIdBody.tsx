import "./style.css";
import CardMovieEmpty from "../../atom/card-movie-empty";
import { altLogoCompanyUrl, posterUrl } from "../../../fetch/constants/urls";

interface ICardMovieById {
    overview: string;
    trailerKey: string;
    productionCompanies: {
        id: number; //12;
        logo_path: string; //"/iaYpEp3LQmb8AfAtmTvpqd4149c.png";
        name: string; //"New Line Cinema";
        origin_country: string; //"US";
    }[];
}

export default function CardMovieById({
    overview,
    trailerKey,
    productionCompanies,
}: ICardMovieById) {
    return (
        <CardMovieEmpty>
            <div className='card-movie-byid-body'>
                <div className='card-movie-byid-body-trailer'>
                    <div>Trailer</div>
                    <div className='card-movie-byid-body-trailer-iframe'>
                        {trailerKey ? (
                            <iframe
                                title='trailer'
                                src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                                allow='encrypted-media'
                                allowFullScreen
                            ></iframe>
                        ) : (
                            "No trailer"
                        )}
                    </div>
                </div>

                <div className='card-movie-byid-body-overview'>
                    <div>Description</div>
                    <div>{overview || "No description"}</div>
                </div>
                <div className='card-movie-byid-body-production'>
                    <div>Production</div>
                    <div className='card-movie-byid-body-production-body'>
                        {productionCompanies?.length
                            ? productionCompanies.map((company) => (
                                  <div
                                      key={company.id}
                                      className='card-movie-byid-body-production-body-company'
                                  >
                                      <div className='card-movie-byid-body-production-body-company-logo'>
                                          <img
                                              src={`${posterUrl}${company.logo_path}`}
                                              alt=''
                                              onError={({
                                                  target,
                                              }: {
                                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                  target: any;
                                              }) => (
                                                  (target.error = null),
                                                  (target.src =
                                                      altLogoCompanyUrl)
                                              )}
                                          />
                                      </div>
                                      <div className='card-movie-byid-body-production-body-company-name'>
                                          {company.name}
                                      </div>
                                  </div>
                              ))
                            : "No information"}
                    </div>
                </div>
            </div>
        </CardMovieEmpty>
    );
}
