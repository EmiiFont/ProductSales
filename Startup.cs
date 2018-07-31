using System.Threading.Tasks;
using MakeupSales.Dao;
using MakeupSales.Hubs;
using MakeupSales.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Serilog;

namespace ProductSales
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

             Log.Logger  = new LoggerConfiguration()
                  .WriteTo.Console()
                 // Insert Sentry DSN here
                 .WriteTo.Sentry(configuration["SentryDsn"])
                 .Enrich.FromLogContext()
                 // Add Http Context for Sentry
                 .Destructure.With<HttpContextDestructingPolicy>()
                 .Filter.ByExcluding(e => e.Exception?.CheckIfCaptured() == true)
                 .CreateLogger();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

             services.Configure<SentryOptions>(Configuration);
            services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog(dispose: true));

            var provider = services.BuildServiceProvider();
            var options =  provider.GetService<IOptions<SentryOptions>>();

            services.AddTransient<IChangeHandler, ChangeHandler>();
            
	        services.AddTransient<IProductRepository>(p => {
                return new ProductRepository(options.Value.HostName, options.Value.DatabaseName);
            });

            // services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            // {
            //     builder
            //     .AllowAnyMethod()
            //     .AllowAnyHeader()
            //     .WithOrigins("http://localhost:4200");
            // }));
            services.AddSignalR();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IChangeHandler sp)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
     
            loggerFactory.AddConsole(Configuration.GetSection("Logging")); //log levels set in your configuration
	        loggerFactory.AddDebug(); //does all log levels
            loggerFactory.AddSerilog();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.AddSentryContext();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

             //thread that checks for document changes
             //use an Ihosted service for this instead
            Task.Factory.StartNew(sp.HandleUpdates,
                TaskCreationOptions.LongRunning);
            
             //app.UseCors("CorsPolicy");
            app.UseSignalR(rou =>
            {
                rou.MapHub<ProductHub>("/hubs/product");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
